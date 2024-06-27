const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const customer = require('./customer');
const employee = require('./employee');
const shipper = require('./shipper');

const Order = sequelize.define('Order', {
    orderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : customer,
            key : 'customerID'
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : employee,
            key : 'employeeID'
        }
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    shipperID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : shipper,
            key : 'shipperID'
        }
    }
});

//relasi order dg customer
Order.belongsTo(customer,{foreignKey:'customerID'});
customer.hasMany(order,{foreignKey:'customerID'});

//relasi order dg shipper
Order.belongsTo(shipper,{foreignKey:'shipperID'});
shipper.hasMany(order,{foreignKey:'shipperID'});

//relasi order dg employee
Order.belongsTo(employee,{foreignKey:'employeeID'});
employee.hasMany(order,{foreignKey:'employeeID'});

module.exports = Order;