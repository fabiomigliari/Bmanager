import { Op } from 'sequelize';
import { subDays, startOfDay } from 'date-fns';

import Sale from '../../models/Sale.js';
import SaleProduct from '../../models/SaleProduct.js';
import Product from '../../models/Product.js';
import Size from '../../models/Size.js';

import Database from '../../../database/index.js';

class BestSellersByAmountController {
  async index(req, res) {
    const products = await SaleProduct.findAll({
      include: [
        {
          model: Sale,
          as: 'sale',
          attributes: [],
          where: {
            created_at: {
              [Op.gte]: startOfDay(subDays(new Date(), 7)),
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
          attributes: ['id', 'description'],
        },
      ],
      attributes: [
        [
          Database.connection.fn('sum', Database.connection.col('amount')),
          'total_amount',
        ],
      ],
      group: ['product.id', 'size.id'],
      order: [
        [
          Database.connection.fn('sum', Database.connection.col('amount')),
          'DESC',
        ],
      ],
      limit: 5,
    });

    return res.json(products);
  }
}

export default new BestSellersByAmountController();
