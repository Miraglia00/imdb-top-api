const express = require('express');
const router = express.Router();
const db = require('../database/db');
const userSchema = require('../database/schemas/userSchema');
const userModel = db.model('users', userSchema);

router.post('/register', (req, res) => {
     res.json(req.body);
});

module.exports = router;