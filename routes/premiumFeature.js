// const express = require('express');

// const premiumFeatureController = require('../controller/premiumFeature');

// const authenticatemiddleware = require('../middleware/auth');

// const router = express.Router();

// router.get('/showLeaderBoard', authenticatemiddleware.authenticate,premiumFeatureController.getUserLeaderBoard);


// module.exports = router;

const express = require('express');
const router = express.Router();
const PremiumFeatureController = require('../controller/premiumFeature'); // Import your premium feature controller
const AuthenticateMiddleware = require('../middleware/auth'); // Import your authentication middleware

// Define a route for showing the leaderboard of premium users
router.get('/showLeaderBoard', AuthenticateMiddleware.authenticate, PremiumFeatureController.getUserLeaderBoard);

module.exports = router;
