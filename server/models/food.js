const { sequelize, DataTypes } = require("../database");
const Restaurant = require("./restaurant");

const Food = sequelize.define("Food", {
	name: { type: DataTypes.STRING, allowNull: false },
	price: { type: DataTypes.FLOAT, allowNull: false },
});

Restaurant.hasMany(Food, { onDelete: "CASCADE" });
Food.belongsTo(Restaurant);

module.exports = Food;
