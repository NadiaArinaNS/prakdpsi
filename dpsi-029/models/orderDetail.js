const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const Order = require('./order');
const Product = require('./product');
const OrderDetail = sequelize.define('OrderDetail', {
    orderDetailID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Order,
            key:'oderID'
        }
    },
    productID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Product,
            key:'productID'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

//relasi orderDetail dg produk
OrderDetail.belongsTo(Product,{foreignKey:'productID'});
Product.hasMany(OrderDetail,{foreignKey:'productID'});

//relasi orderDetail dg order
OrderDetail.belongsTo(order,{foreignKey:'orderID'});
order.hasMany(OrderDetail,{foreignKey:'orderID'});

module.exports = OrderDetail;
