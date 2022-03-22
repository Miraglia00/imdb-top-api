const db = require('../../database/db');
const userSchema = require('../../database/schemas/userSchema');
const bcrypt = require('bcrypt');

const userModel = db.model('user', userSchema);

const checkLoginCredentials = async (username, password) => {
    let foundUser = await userModel.findOne({username});
    if (foundUser === null) return false;

    let validPassword = await bcrypt.compare(password, foundUser.password);

    return validPassword;
};

module.exports = checkLoginCredentials;