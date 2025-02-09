import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';
import User from '../models/User.js';
import UserAvatar from '../models/UserAvatar.js';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: {
        model: UserAvatar,
        as: 'avatar',
        attributes: ['id', 'url', 'path'],
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!user.active) {
      return res.status(401).json({ error: 'Inactive user.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, avatar, administrator } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
        administrator,
      },
      token: jwt.sign({ id, administrator }, authConfig.secret),
    });
  }
}

export default new SessionController();
