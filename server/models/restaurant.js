const { sequelize, DataTypes } = require("../database");

const Restaurant = sequelize.define("Restaurant", {
	name: { type: DataTypes.STRING, allowNull: false },
	address: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Restaurant;
