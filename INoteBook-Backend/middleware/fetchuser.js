const jwt = require('jsonwebtoken');

const JWT_Secret = 'Baljeetisagoodb$oy';

const fetchuser = (req, res, next) => {
    // Get the user from jwt token and add id  to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please  authenticate using a vallid token" })
    }
    try {
        const data = jwt.verify(token, JWT_Secret);
        req.user = data.user// Attach user information to the request object
        next();
    } catch (error) {
        res.status(500).send('Internal server error')
    }
}

module.exports = fetchuser;