import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth.js';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  
  const [, token] = authHeader.split(' ');
  

  try {

    const { id } = await promisify(jwt.verify)(token, authConfig.secret);
    
    req.userId = id;
    return next();
} catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid token.' });
}

};
