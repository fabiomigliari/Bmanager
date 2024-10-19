import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer.js';

import authMiddleware from './app/middlewares/auth.js';
import administratorMiddleware from './app/middlewares/administrator.js';

import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import ProfileController from './app/controllers/ProfileController.js';
import ProfileAvatarController from './app/controllers/ProfileAvatarController.js';
import SizeController from './app/controllers/SizeController.js';
import ProductController from './app/controllers/ProductController.js';
import ProductPriceController from './app/controllers/ProductPriceController.js';
import ProductImageController from './app/controllers/ProductImageController.js';
import CouponController from './app/controllers/CouponController.js';
import StockOperationController from './app/controllers/StockOperationController.js';
import ProductStockAmountController from './app/controllers/ProductStockAmountController.js';

import DashboardTotalStockOperationsTodayController from './app/controllers/Dashboard/TotalStockOperationsTodayController.js';
import DashboardTotalSalesTodayController from './app/controllers/Dashboard/TotalSalesTodayController.js';
import DashboardLastDaysTotalSalesController from './app/controllers/Dashboard/LastDaysTotalSalesController.js';
import DashboardLatestSalesController from './app/controllers/Dashboard/LatestSalesController.js';
import DashboardBestSellersByAmountController from './app/controllers/Dashboard/BestSellersByAmountController.js';

import BestSellersByLiterChartController from './app/controllers/Charts/BestSellersByLiterController.js';
import MonthlyStockOperationsByWeekChartController from './app/controllers/Charts/MonthlyStockOperationsByWeek.js';

import SalesReportController from './app/controllers/Reports/SalesController.js';
import StockOperationsReportController from './app/controllers/Reports/StockOperationsController.js';
import TotalDiscountByCouponReportController from './app/controllers/Reports/TotalDiscountByCouponController.js';

const routes = Router();
const upload = multer(multerConfig);



routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);

routes.get('/profile', ProfileController.index);
routes.put('/profile', ProfileController.update);

routes.post(
  '/profile/avatar',
  upload.single('file'),
  ProfileAvatarController.store
);
routes.delete('/profile/avatar', ProfileAvatarController.delete);

routes.get('/users', administratorMiddleware, UserController.index);
routes.get('/users/:id', administratorMiddleware, UserController.index);
routes.post('/users', administratorMiddleware, UserController.store);
routes.put('/users/:id', administratorMiddleware, UserController.update);

routes.get('/sizes', SizeController.index);
routes.get('/sizes/:id', SizeController.index);
routes.post('/sizes', SizeController.store);
routes.put('/sizes/:id', SizeController.update);

routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);

routes.get('/products/:productId/prices', ProductPriceController.index);
routes.get('/products/:productId/prices/:id', ProductPriceController.index);
routes.post('/products/:productId/prices', ProductPriceController.store);
routes.put('/products/:productId/prices/:id', ProductPriceController.update);

routes.get('/products/:productId/images', ProductImageController.index);
routes.post(
  '/products/:productId/images',
  upload.single('file'),
  ProductImageController.store
);
routes.delete('/products/:productId/images/:id', ProductImageController.delete);

routes.get('/coupons', CouponController.index);
routes.get('/coupons/:id', CouponController.index);
routes.post('/coupons', CouponController.store);
routes.put('/coupons/:id', CouponController.update);

routes.get('/stock-operations', StockOperationController.index);
routes.get('/stock-operations/:id', StockOperationController.index);
routes.post('/stock-operations/', StockOperationController.store);
routes.delete(
  '/stock-operations/:id',
  administratorMiddleware,
  StockOperationController.delete
);

routes.get('/product-stock-amount', ProductStockAmountController.index);

routes.get(
  '/dashboard/total-stock-operations-today',
  administratorMiddleware,
  DashboardTotalStockOperationsTodayController.index
);

routes.get(
  '/dashboard/total-sales-today',
  administratorMiddleware,
  DashboardTotalSalesTodayController.index
);

routes.get(
  '/dashboard/last-days-total-sales',
  administratorMiddleware,
  DashboardLastDaysTotalSalesController.index
);

routes.get(
  '/dashboard/latest-sales',
  administratorMiddleware,
  DashboardLatestSalesController.index
);

routes.get(
  '/dashboard/best-sellers-by-amount',
  administratorMiddleware,
  DashboardBestSellersByAmountController.index
);

routes.get(
  '/charts/best-sellers-by-liter',
  administratorMiddleware,
  BestSellersByLiterChartController.index
);

routes.get(
  '/charts/monthly-stock-operations-by-week',
  administratorMiddleware,
  MonthlyStockOperationsByWeekChartController.index
);

routes.get(
  '/reports/sales',
  administratorMiddleware,
  SalesReportController.index
);

routes.get(
  '/reports/stock-operations',
  administratorMiddleware,
  StockOperationsReportController.index
);

routes.get(
  '/reports/total-discount-by-coupon',
  administratorMiddleware,
  TotalDiscountByCouponReportController.index
);

export default routes;
