module.exports.isAuth = (req, res, next) => {
    // check if authenticated
    if (req.isAuthenticated()) {
        next(); // pass to next middleware in the chain
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
}

module.exports.isAdmin = (req, res, next) => {
    // check if logged in AND is an admin
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
}