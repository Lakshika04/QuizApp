import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const JWT_SECRET = 'your_jwt_secret_here';

export async function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success:false, 
            message:'not authorized, token missing'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload= jwt.verify(token,JWT_SECRET);
        const user = await User.findById(payload.id).select('-password');

        if(!user){
            return res.status(401).json({
                success:false,
                message:'user not found'
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log('JWT VERIFICATION FAILED:', err);
        return res.status(401).json({
            success:false,
            message:' token invalid or expired'
        });
        
    }
}