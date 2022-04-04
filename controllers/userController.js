const db = require('../database/db');
const userSchema = require('../database/schemas/userSchema');
const userModel = db.model('users', userSchema);
const validateBySchema = require('../services/database/validateBySchema');
const checkIfUserExist = require('../services/user/checkIfUserExist');
const checkLoginCredentials = require('../services/user/checkLoginCredentials');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.checkToken = async (req,res,next) => {
    if(res.locals.token === true) {
         const error = new Error('Logging in or registering not needed as a verified token provided in the header.');
         res.status(400);
         next(error,'route');
    }else next();
}

exports.checkIfTokenValid = async (req,res) => {
     if(res.locals.token===true) {
          res.status(200).json(res.locals.user);
     }else res.status(400).json({});
}

exports.registerUser = async (req, res, next) => {
    let user = new userModel(req.body);
    let validation = validateBySchema(user);

    if(validation.valid === true) {
         let exist = await checkIfUserExist(user.username);
         if(exist) {
              res.status(400);
              validation.valid = false;
              validation.errors['username'] = "Username already in use!";
              next(validation);
         }else{
              bcrypt.hash(user.password, 10, async (err, hash) => {
                   if(err !== undefined) {
                        res.status(503);
                        next(err);
                   }
    
                   user.password = hash;
                   await user.save();
    
                   res.json({message: "Registration successful!"});
              });
         }
    }else{
         res.status(400);
         next(validation);
    }
}

exports.loginUser = async (req, res, next) => {
     let user = new userModel(req.body);
     let validation = validateBySchema(user);

     if(validation.valid === true) {
          const login = await checkLoginCredentials(user.username, user.password);
          if(login) {
               const token = jwt.sign({username: req.body.username}, process.env.JWT_SECRET || 'strongsecret0011');
               res.header('Authorization', 'Bearer ' + token).json({
                    error: {valid: true},
                    message: "Login successful!"
               });
          }else{
               res.status(400);
               validation.valid = false;
               validation.errors['general'] = "Provided credentials not found in the database!";
               next(validation);
          }
     }else{
         res.status(400);
         next(validation);
    }
 }