import { Op, literal } from 'sequelize';
import { parseISO, startOfDay, endOfDay, isBefore, isAfter } from 'date-fns';

import Sale from '../../models/Sale.js';
import SaleProduct from '../../models/SaleProduct.js';
import Product from '../../models/Product.js';
import Size from '../../models/Size.js';

import Database from '../../../database/index.js';

class BestSellersByLiterController {
  async index(req, res) {
    if (!req.query.startingDate || !req.query.endingDate) {
      return res.status(400).json({
        error: 'Starting and ending date request params must have value.',
      });
    }

    const startingDate = startOfDay(parseISO(req.query.startingDate));
    const endingDate = endOfDay(parseISO(req.query.endingDate));

    if (isAfter(startingDate, endingDate)) {
      return res
        .status(400)
        .json({ error: 'Starting date must be before ending date.' });
    }

    if (isBefore(endingDate, startingDate)) {
      return res
        .status(400)
        .json({ error: 'Ending date must be after starting date.' });
    }

    const products = await SaleProduct.findAll({
      include: [
        {
          model: Sale,
          as: 'sale',
          attributes: [],
          where: {
            date: {
              [Op.between]: [startingDate, endingDate],
            },
            status: {
              [Op.not]: 'C',
            },
          },
        },
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name'],
        },
        {
          model: Size,
          as: 'size',
          attributes: [],
        },
      ],
      attributes: [
        [
          Database.connection.fn('sum', literal('amount * size.capacity')),
          'liters',
        ],
      ],
      group: ['product.id'],
      order: [
        [
          Database.connection.fn('sum', literal('amount * size.capacity')),
          'DESC',
        ],
      ],
      limit: 5,
    });

    return res.json(products);
  }
}

export default new BestSellersByLiterController();
