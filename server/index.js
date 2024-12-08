const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./database");
const clientsRouter = require("./routes/clients");
const restaurantsRouter = require("./routes/restaurants");
const foodsRouter = require("./routes/foods");
const ordersRouter = require("./routes/orders");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/clients", clientsRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/foods", foodsRouter);
app.use("/orders", authMiddleware, ordersRouter);

(async () => {
	await sequelize.sync();
	app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
})();
