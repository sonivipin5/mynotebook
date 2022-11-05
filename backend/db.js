// create mongoose variable form mongoose 
require('dotenv').config()
const mongoose = require('mongoose')
// create mongoURI - the URI is mongoDB database URL
const mongoURI = process.env.MONGOURI


// create connectToMongo function for database connection
const connectToMongo = ()=>{
 
    // mongoose.connect() is database connection function
    mongoose.connect(mongoURI, ()=>{ 
        console.log('Connection successful with mongoDB')
    } )
}

// exports connectToMongo
module.exports = connectToMongo