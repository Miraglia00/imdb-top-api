const jwt = require('jsonwebtoken');

module.exports = async (req,res,next) => {
    if(req.headers['authorization'] !== undefined || req.headers['authorization'] !== null) {
        const token = req.headers['authorization'].split('Bearer ')[1];
        let verify = await jwt.verify(token, process.env.JWT_SECRET || 'strongsecret0011');
        if(verify) {
            res.locals.token = true;
        }else{
            res.locals.token = false;
        }
    }else{
        res.locals.token = false;
    }

    next();
}