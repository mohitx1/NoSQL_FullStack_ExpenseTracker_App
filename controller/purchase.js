// const Razorpay = require('razorpay');
// const Order = require('../models/orders')
// const userController = require('./user')


// const purchasepremium =async (req, res) => {
//     try {
//         var rzp = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_KEY_SECRET
//         })
//         const amount = 2500;

//         rzp.orders.create({amount, currency: "INR"}, (err, order) => {
//             if(err) {
//                 throw new Error(JSON.stringify(err));
//             }
//             req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
//                 return res.status(201).json({ order, key_id : rzp.key_id});

//             }).catch(err => {
//                 throw new Error(err)
//             })
//         })
//     } catch(err){
//         console.log(err);
//         res.status(403).json({ message: 'Sometghing went wrong', error: err})
//     }
// }

//  const updateTransactionStatus = async (req, res ) => {
//     try {
//         const userId = req.user.id;
//         const { payment_id, order_id} = req.body;
//         const order  = await Order.findOne({where : {orderid : order_id}}) //2
//         const promise1 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
//         const promise2 =  req.user.update({ ispremiumuser: true }) 

//         Promise.all([promise1, promise2]).then(()=> {
//             return res.status(202).json({sucess: true, message: "Transaction Successful", token: userController.generateAccessToken(userId,undefined , true) });
//         }).catch((error ) => {
//             throw new Error(error)
//         })

        
                
//     } catch (err) {
//         console.log(err);
//         res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

//     }
// }

// module.exports = {
//     purchasepremium,
//     updateTransactionStatus
// }

const Razorpay = require('razorpay');
const Order = require('../models/orders');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
// const { secretKey } = require('../config');

const purchasePremium = async (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }

      // Create a new order document and associate it with the user
      const newOrder = new Order({
        orderid: order.id,
        status: 'PENDING',
        userId: req.user._id, // Assuming you store user IDs in _id field after using Mongoose
      });

      await newOrder.save();

      return res.status(201).json({ order, key_id: rzp.key_id });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: 'Something went wrong', error: err });
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you store user IDs in _id field after using Mongoose
    const { payment_id, order_id } = req.body;

    // Find the order associated with the given order_id
    const order = await Order.findOne({ orderid: order_id });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Update the order with payment details and status
    order.paymentid = payment_id;
    order.status = 'SUCCESSFUL';
    await order.save();

    // Update the user's premium status
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.ispremiumuser = true;
    await user.save();

    // Generate a new JWT token with updated premium status
    const token = jwt.sign({ userId: user._id, name: user.name, ispremiumuser: true }, "secretKey");

    return res.status(202).json({ success: true, message: "Transaction Successful", token });
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err, message: 'Something went wrong' });
  }
};

module.exports = {
  purchasePremium,
  updateTransactionStatus,
};
