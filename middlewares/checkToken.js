const jwt = require('jsonwebtoken');

module.exports = async (req,res,next) => {
    if(req.headers['authorization'] !== undefined && req.headers['authorization'] !== null) {
        const token = req.headers['authorization'].split('Bearer ');
        if(token.length === 1) {
            res.locals.token = false;
        }else{
            let verify = await jwt.verify(token[1], process.env.JWT_SECRET || 'strongsecret0011');
            if(verify) {
                res.locals.token = true;
                res.locals.user = verify;
            }else{
                res.locals.token = false;
            }
        }
    }else{
        res.locals.token = false;
    }

    next();
}