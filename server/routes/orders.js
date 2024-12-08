const express = require("express");
const Order = require("../models/order");
const Client = require("../models/client");
const Restaurant = require("../models/restaurant");
const Food = require("../models/food");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const { ClientId } = req.query;
		const filter = ClientId ? { ClientId } : {};
		const orders = await Order.findAll({
			where: filter,
			include: [{ model: Food }, { model: Client }, { model: Restaurant }],
		});
		res.json(orders);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const order = await Order.findByPk(req.params.id, {
			include: [{ model: Food }, { model: Client }, { model: Restaurant }],
		});
		if (!order) return res.status(404).send("Order not found");
		res.json(order);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post("/", async (req, res) => {
	const { ClientId, RestaurantId, foodIds, status } = req.body;
	try {
		const client = await Client.findByPk(ClientId);
		const restaurant = await Restaurant.findByPk(RestaurantId);
		if (!client || !restaurant)
			return res.status(404).json({ message: "Client or restaurant not found" });
		const order = await Order.create({ ClientId, RestaurantId, status });
		const foods = await Food.findAll({ where: { id: foodIds } });
		foods.forEach(async food => await order.addFood(food));
		res.status(201).json(order);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.put("/:id", async (req, res) => {
	const { status, foodIds } = req.body;

	try {
		const order = await Order.findByPk(req.params.id);
		if (!order) return res.status(404).send("Order not found");
		if (status) {
			order.status = status;
			await order.save();
		}
		if (foodIds) {
			const foods = await Food.findAll({
				where: { id: foodIds, restaurantId: order.restaurantId },
			});
			if (foods.length !== foodIds.length)
				return res.status(400).send("Some foods do not belong to the restaurant");
			foods.forEach(async food => order.setFood(food));
		}
		res.json(order);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const order = await Order.findByPk(req.params.id);
		if (!order) return res.status(404).send("Order not found");
		await order.destroy();
		res.status(204).send();
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;
