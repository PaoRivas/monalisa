module.exports = {
    isLoggedIn (req, res, next) {
        const nonSecurePaths = ['/signup', '/signin', '/logout', '/favicon.ico'];
        if (req.isAuthenticated() || nonSecurePaths.includes(req.path)) {
            return next();
        }
        return res.redirect('/signin');
    }
};