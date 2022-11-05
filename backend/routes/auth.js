/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchuser = require('../middleware/fetchuser')
const jwt = require('jsonwebtoken')
const JWT_SECRETE = 'JFKLASDJFKNSDJFDASFSAJFR43D2RD#@r23d32f164'


// ROUTE 1: Create user: POST '/api/auth/createuser'. dose'nt require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter the valid Name").isLength({ min: 3 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter the password minimum 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are error, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with  this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" });
      }

      // bcryptjs for password hashing
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //   create a new user with validation
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // create JWT_TOKEN WITH USER ID
      const data ={
        user:{
          id: user.id
        }
      }
      // JWT sing
      const authtoken = jwt.sign(data, JWT_SECRETE)
      res.json({authtoken});
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred ");
    }
  }
);

//ROUTE:2 Authenticate a User: POST '/api/auth/login'. No login require 
router.post(
  "/login",
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "Password cat not be black").exists(),
  ], async (req, res) => {

    // if there are error, return Bad request and the errors
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const {email, password} = req.body
    try {
      let user = await User.findOne({email})
      if(!user){
        return res.status(400).json({success, error: "Please try to login with correct credentials"})
      }

      const passwordCompare = await bcrypt.compare(password, user.password)
      if(!passwordCompare){
        return res.status(400).json({success, error: "Please try to login with correct credentials"})
      }

      const data ={
        user:{
          id: user.id
        }
      }
      // JWT sing
      const authtoken = jwt.sign(data, JWT_SECRETE)
      success= true
      res.json({success, authtoken});
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internet Server Error ");
    }
  })

  //ROUTE:3  Get user logged in User Details: POST '/api/auth/getuser'. No login require 
router.post( "/getuser", fetchuser, async (req, res) => {
    try {  
      userId = req.user.id;
      const user = await User.findById(userId).select('-password')
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internet Server Error ");
    }
    
  }) 

module.exports = router;
