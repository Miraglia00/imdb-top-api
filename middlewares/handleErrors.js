module.exports = (err,req,res,next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        status: statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '😎' : err.stack
    });
};