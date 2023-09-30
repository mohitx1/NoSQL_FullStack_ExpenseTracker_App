// // const express = require('express');

// // const expenseController = require('../controller/expense')
// // const userauthentication = require('../middleware/auth')

// // const router = express.Router();

// // router.post('/addexpense', userauthentication.authenticate,  expenseController.addexpense )

// // router.get('/getexpenses', userauthentication.authenticate ,  expenseController.getexpenses )

// // router.delete('/deleteexpense/:expenseid', userauthentication.authenticate , expenseController.deleteexpense)

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const ExpenseController = require('../controller/expense'); // Import your expense controller
// const UserAuthentication = require('../middleware/auth'); // Import your authentication middleware

// // Define routes for adding, getting, and deleting expenses
// router.post('/addexpense', UserAuthentication.authenticate, ExpenseController.addExpense); // Use the addExpense function from your controller
// router.get('/getexpenses', UserAuthentication.authenticate, ExpenseController.getExpenses); // Use the getExpenses function from your controller
// router.delete('/deleteexpense/:expenseid', UserAuthentication.authenticate, ExpenseController.deleteExpense); // Use the deleteExpense function from your controller

// module.exports = router;

const express = require('express');
const router = express.Router();
const ExpenseController = require('../controller/expense'); // Import your expense controller
const AuthenticateMiddleware = require('../middleware/auth'); // Import your authentication middleware

// Define routes for adding, getting, and deleting expenses
router.post('/addexpense', AuthenticateMiddleware.authenticate, ExpenseController.addExpense);
router.get('/getexpenses', AuthenticateMiddleware.authenticate, ExpenseController.getExpenses);
router.delete('/deleteexpense/:expenseid', AuthenticateMiddleware.authenticate, ExpenseController.deleteExpense);

module.exports = router
