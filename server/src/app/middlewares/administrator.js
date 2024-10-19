import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth.js';

export default async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ');

  const { administrator } = await promisify(jwt.verify)(
    token,
    authConfig.secret
  );

  console.log(administrator);

  if (!administrator) {
    return res.status(401).json({
      error: 'Administrator rights are required to perform this action.',
    });
  }

  return next();
};
