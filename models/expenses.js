// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// //id, name , password, phone number, role

// const Expense = sequelize.define('expenses', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     expenseamount: Sequelize.INTEGER,
//     category: Sequelize.STRING,
//     description: Sequelize.STRING,
// })

// module.exports = Expense;

// const mongoose = require('mongoose');

// const expenseSchema = new mongoose.Schema({
//   expenseamount: Number,
//   category: String,
//   description: String,
// });

// const Expense = mongoose.model('Expense', expenseSchema);

// module.exports = Expense;

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  expenseamount: Number,
  category: String,
  description: String,
  // Reference to the User model based on userId
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
