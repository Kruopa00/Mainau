function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        // jwt authetincation error
        return res.status(401).json({message: "The user is not authorized"})
    }

    if (err.name === 'UnauthorizedError') {
        // validation error
        return  res.status(401).json({message: err})
    }

    // default to 500 server error

    return res.status(500).json(err);
}

module.exports = errorHandler;