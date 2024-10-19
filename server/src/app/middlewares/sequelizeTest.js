import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('bmanager', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false, // Optionally, disable logging to suppress Sequelize logs
  ssl: false, // Deactivate SSL
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
