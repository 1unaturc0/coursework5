const { sequelize, DataTypes } = require("../database");
const bcrypt = require("bcrypt");

const Client = sequelize.define("Client", {
	name: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	password: { type: DataTypes.STRING, allowNull: false },
	address: { type: DataTypes.STRING, allowNull: false },
});

Client.beforeCreate(async client => {
	const salt = await bcrypt.genSalt(10);
	client.password = await bcrypt.hash(client.password, salt);
});

Client.beforeUpdate(async client => {
	if (client.changed("password")) {
		const salt = await bcrypt.genSalt(10);
		client.password = await bcrypt.hash(client.password, salt);
	}
});

module.exports = Client;
