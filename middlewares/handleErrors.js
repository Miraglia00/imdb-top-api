module.exports = (err,req,res,next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);

    if(typeof err === 'string' || (typeof err === 'object' && err.message !== undefined && err.stack !== undefined)) {
        res.json({
            status: statusCode,
            method: res.req.method,
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? '😎' : err.stack
        });
    }else{
        res.json({
            status: statusCode,
            method: res.req.method,
            error: err,
        });
    }
    
};