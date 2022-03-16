module.exports = (req,res,next) => {
    res.status(404);
    const error = new Error(`👀 Requested content is not found! - ${req.originalUrl}`);
    next(error);
};