const { sequelize, DataTypes } = require("../database");
const Client = require("./client");
const Restaurant = require("./restaurant");
const Food = require("./food");

const Order = sequelize.define("Order", {
	status: { type: DataTypes.STRING, allowNull: false, defaultValue: "Pending" },
});

Client.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(Client);

Restaurant.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(Restaurant);

Order.belongsToMany(Food, { through: "OrderFood", onDelete: "CASCADE" });
Food.belongsToMany(Order, { through: "OrderFood", onDelete: "CASCADE" });

module.exports = Order;
