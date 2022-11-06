require('dotenv').config()
const path = require('path')
const connectToMongo = require("./db");
const express = require("express");
const cors  = require('cors')
// run mongoDB connection function
connectToMongo();

// express app
const app = express();
const port = process.env.PORT || 5000  

console.log(port)

// use cors for cross port
app.use(cors())
// if we want to get res.body data use this function
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth")); 
app.use("/api/notes", require("./routes/notes"));

// Production setup

// if(process.env.NODE_ENV=="production"){
//   app.use(express.static('client/build'))
 
// }  
app.get('/', (req, res)=>{
  res.json({"server":"start"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${"http://localhost:" + port}`);
});
