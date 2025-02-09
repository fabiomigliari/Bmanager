import { Op } from 'sequelize';

import Sale from '../../models/Sale.js';
import Customer from '../../models/Customer.js';
import PaymentMethod from '../../models/PaymentMethod.js';

class LatestSalesController {
  async index(req, res) {
    const totals = await Sale.findAll({
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name'],
        },
        {
          model: PaymentMethod,
          as: 'payment_method',
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['date', 'status', 'total_amount', 'net_total'],
      where: {
        status: {
          [Op.not]: 'C',
        },
      },
      order: [['date', 'DESC']],
      limit: 5,
    });

    return res.json(totals);
  }
}

export default new LatestSalesController();
