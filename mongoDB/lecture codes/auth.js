const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';


function auth(req, res, next) {
    const token = req.headers.token;
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'unauthorized'
        });
    }
}

module.exports = { auth  };