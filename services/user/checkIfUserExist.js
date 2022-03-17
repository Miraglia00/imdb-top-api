const db = require('../../database/db');
const userSchema = require('../../database/schemas/userSchema');

const userModel = db.model('user', userSchema);
const checkIfUserExist = async (username) => {
    let foundUser = await userModel.findOne({username});
    return (foundUser !== null) ? true : false;
};

module.exports = checkIfUserExist;