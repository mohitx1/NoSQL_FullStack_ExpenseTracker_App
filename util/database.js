// const Sequelize = require('sequelize')
// require('dotenv').config();


// const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER,process.env.DB_PASSWORD,{
//     dialect: 'mysql',
//     host: 'localhost'
// })

// module.exports = sequelize;

require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    });

    const db = mongoose.connection;

    db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    });

    db.once('open', () => {
    console.log('Connected to MongoDB');
    });
}

module.exports = connectDB;