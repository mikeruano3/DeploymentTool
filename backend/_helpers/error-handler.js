module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(200).json({ status: false, message: err });
    }
    
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ status: false, message: err.message, data: err});
    }

    if (err.message) {
        // custom application error
        return res.status(200).json({ status: false, message: err.message, data: err });
    }

    // default to 500 server error
    return res.status(400).json({ status: false, message: err.message, data: err });
}