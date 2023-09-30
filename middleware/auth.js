// // // const jwt = require('jsonwebtoken');
// // // const User = require('../models/users');

// // // const authenticate = (req, res, next) => {

// // //     try {
// // //         const token = req.header('Authorization');
// // //         console.log(token);
// // //         const user = jwt.verify(token, 'secretkey');
// // //         // console.log('userID >>>> ', user.userId)
// // //         User.findByPk(user.userId).then(user => {

// // //             req.user = user; ///ver
// // //             next();
// // //         })

// // //       } catch(err) {
// // //         console.log(err);
// // //         return res.status(401).json({success: false})
// // //         // err
// // //       }

// // // }

// // // module.exports = {
// // //     authenticate
// // // }

// // const jwt = require('jsonwebtoken');
// // const User = require('../models/users'); // Import your MongoDB User model
// // // const { secretKey } = require('../config'); // Import your secret key from a configuration file

// // const authenticate = async (req, res, next) => {
// //   try {
// //     const token = req.header('Authorization');
// //     console.log(token);
// //     if (!token) {
// //       return res.status(401).json({ success: false, message: 'Authorization token missing' });
// //     }

// //     // Verify the JWT token using the secret key
// //     const decoded = jwt.verify(token, "secretKey");

// //     // Find the user in MongoDB using the decoded user ID from the token
// //     const user = await User.findById(decoded.userId);

// //     if (!user) {
// //       return res.status(401).json({ success: false, message: 'User not found' });
// //     }

// //     // Attach the user information to the request object
// //     req.user = user;
// //     next();
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(401).json({ success: false, message: 'Authentication failed' });
// //   }
// // };

// // module.exports = {
// //   authenticate,
// // };


// const jwt = require('jsonwebtoken');
// const User = require('../models/users'); // Import your MongoDB User model
// // const { secretKey } = require('../config'); // Import your secret key from a configuration file

// const authenticate = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization');
//     console.log('>>>>>>',token);
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Authorization token missing' });
//     }

//     // Verify the JWT token using the secret key
//     const decoded = jwt.verify(token, "secretKey");

//     // Find the user in MongoDB using the decoded user ID from the token
//     const user = await User.findById(decoded.userId);

//     if (!user) {
//       return res.status(401).json({ success: false, message: 'User not found' });
//     }

//     // Attach the user information to the request object
//     req.user = user;
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ success: false, message: 'Authentication failed' });
//   }
// };

// module.exports = {
//   authenticate,
// };


const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Import your MongoDB User model
// const secretKey = require('../config').secretKey;

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      throw new Error('Authorization token missing');
    }

    // Verify the JWT token using the secret key
    const decoded = jwt.verify(token, "secretKey");

    // Find the user in MongoDB using the decoded user ID from the token
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Attach the user information to the request object
    req.user = user;
    next();
  } catch (err) {
    err.statusCode = 401; // Set the status code for unauthorized
    next(err);
  }
};

module.exports = {
  authenticate,
};
