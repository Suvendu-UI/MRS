import JWT_SECRET from './config.js';
import jwt from 'jsonwebtoken';



const authenticationMiddleware = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    console.log(token);

    try {
        console.log('4')

        const decoded = jwt.verify(token, JWT_SECRET );

        console.log(decoded);

        req.userId = decoded.iat;

        next();
    } catch (err) {
        return res.status(403).json({
            msg: "Authentication not allowed"
        });
    }



}

export default authenticationMiddleware;
