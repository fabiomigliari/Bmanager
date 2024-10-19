import Sequelize from 'sequelize';

import User from '../app/models/User.js';
import UserAvatar from '../app/models/UserAvatar.js';
import Size from '../app/models/Size.js';
import Product from '../app/models/Product.js';
import ProductPrice from '../app/models/ProductPrice.js';
import ProductImage from '../app/models/ProductImage.js';
import Coupon from '../app/models/Coupon.js';
import StockOperation from '../app/models/StockOperation.js';
import StockOperationProduct from '../app/models/StockOperationProduct.js';
import ProductStockAmount from '../app/models/ProductStockAmount.js';
import PaymentMethod from '../app/models/PaymentMethod.js';
import Customer from '../app/models/Customer.js';
import Sale from '../app/models/Sale.js';
import SaleProduct from '../app/models/SaleProduct.js';

import { databaseConfig } from '../config/database.js';

const models = [
  User,
  UserAvatar,
  Size,
  Product,
  ProductPrice,
  ProductImage,
  Coupon,
  StockOperation,
  StockOperationProduct,
  ProductStockAmount,
  PaymentMethod,
  Customer,
  Sale,
  SaleProduct,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));

      this.connection.sync();
  }
}

export default new Database();
