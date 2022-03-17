const express = require('express');
const router = express.Router();
const db = require('../database/db');
const userSchema = require('../database/schemas/userSchema');
const userModel = db.model('users', userSchema);
const bcrypt = require('bcrypt');
const validateBeforeSave = require('../services/database/validateBeforeSave');
const checkIfUserExist = require('../services/user/checkIfUserExist');

router.post('/register', async (req, res) => {
     let user = new userModel(req.body);
     let validation = validateBeforeSave(user);

     if(validation.valid === true) {
          let exist = await checkIfUserExist(user.username);
          if(exist) {
               res.status(400);
               validation.valid = false;
               validation.errors['username'] = "Username already in use!";
               res.json(validation);
          }else{
               bcrypt.hash(user.password, 10, async (err, hash) => {
                    if(err !== undefined) {
                         res.status(503);
                         res.json(err);
                    }
     
                    user.password = hash;
                    await user.save();
     
                    res.json({message: "Registration successful!"});
               });
          }
     }else{
          res.status(400);
          res.json(validation);
     }
});

module.exports = router;