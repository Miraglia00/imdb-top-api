const db = require('../database/db');
const userSchema = require('../database/schemas/userSchema');
const userModel = db.model('users', userSchema);
const validateBeforeSave = require('../services/database/validateBeforeSave');
const checkIfUserExist = require('../services/user/checkIfUserExist');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res, next) => {
    let user = new userModel(req.body);
    let validation = validateBeforeSave(user);

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