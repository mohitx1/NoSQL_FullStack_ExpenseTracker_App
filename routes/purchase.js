// const express = require('express');

// const purchaseController = require('../controller/purchase');

// const authenticatemiddleware = require('../middleware/auth');

// const router = express.Router();

// router.get('/premiummembership', authenticatemiddleware.authenticate,purchaseController.purchasepremium);

// router.post('/updatetransactionstatus', authenticatemiddleware.authenticate, purchaseController.updateTransactionStatus)

// module.exports = router;

const express = require('express');
const router = express.Router();
const PurchaseController = require('../controller/purchase'); // Import your purchase controller
const Authenticatemiddleware = require('../middleware/auth'); // Import your authentication middleware

// Define routes for purchasing premium membership and updating transaction status
router.get('/premiummembership', Authenticatemiddleware.authenticate, PurchaseController.purchasePremium);
router.post('/updatetransactionstatus', Authenticatemiddleware.authenticate, PurchaseController.updateTransactionStatus);

module.exports = router;
