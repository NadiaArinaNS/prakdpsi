const { Sequelize } = require('sequelize');
// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize('dpsi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Customer = require('./models/customer')(sequelize, Sequelize.DataTypes);
const Employee = require('./models/employee')(sequelize, Sequelize.DataTypes);
const Product = require('./models/product')(sequelize, Sequelize.DataTypes);
const Supplier = require('./models/supplier')(sequelize, Sequelize.DataTypes);
const Order = require('./models/order')(sequelize, Sequelize.DataTypes);
const Shipper = require('./models/shipper')(sequelize, Sequelize.DataTypes);
const OrderDetail = require('./models/orderDetail')(sequelize, Sequelize.DataTypes);
const Category = require('./models/category')(sequelize, Sequelize.DataTypes);
// Relasi antara model
Customer.hasMany(Order, { foreignKey: 'customerID' });
Order.belongsTo(Customer, { foreignKey: 'customerID' });
Employee.hasMany(Order, { foreignKey: 'employeeID' });
Order.belongsTo(Employee, { foreignKey: 'employeeID' });
Shipper.hasMany(Order, { foreignKey: 'shipperID' });
Order.belongsTo(Shipper, { foreignKey: 'shipperID' });
Supplier.hasMany(Product, { foreignKey: 'supplierID' });
Product.belongsTo(Supplier, { foreignKey: 'supplierID' });
Category.hasMany(Product, { foreignKey: 'categoryID' });
Product.belongsTo(Category, { foreignKey: 'categoryID' });
Order.hasMany(OrderDetail, { foreignKey: 'orderID' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderID' });
Product.hasMany(OrderDetail, { foreignKey: 'productID' });
OrderDetail.belongsTo(Product, { foreignKey: 'productID' });

// Uji koneksi
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
// Ekspor instance sequelize untuk digunakan di tempat lain

sequelize.sync()
  .then(() => {
    console.log('Database & tabel telah dibuat!');
  })
  .catch(err => {
    console.error('Error saat membuat database & tabel:', err);
  });

module.exports = sequelize;