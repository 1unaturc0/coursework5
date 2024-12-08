const express = require("express");
const Restaurant = require("../models/restaurant");
const Food = require("../models/food");
const router = express.Router();

router.get("/", async (_, res) => {
	const restaurants = await Restaurant.findAll();
	res.json(restaurants);
});

router.get("/:id", async (req, res) => {
	const restaurant = await Restaurant.findByPk(req.params.id);
	if (restaurant) res.json(restaurant);
	else res.status(404).send("Restaurant not found");
});

router.get("/:id/foods", async (req, res) => {
	try {
		const restaurant = await Restaurant.findByPk(req.params.id, {
			include: Food,
		});
		if (!restaurant) return res.status(404).send("Restaurant not found");

		res.json(restaurant.Food);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post("/", async (req, res) => {
	const restaurant = await Restaurant.create(req.body);
	res.status(201).json(restaurant);
});

router.put("/:id", async (req, res) => {
	const restaurant = await Restaurant.findByPk(req.params.id);
	if (restaurant) {
		await restaurant.update(req.body);
		res.json(restaurant);
	} else res.status(404).send("Restaurant not found");
});

router.delete("/:id", async (req, res) => {
	const restaurant = await Restaurant.findByPk(req.params.id);
	if (restaurant) {
		await restaurant.destroy();
		res.status(204).send();
	} else res.status(404).send("Restaurant not found");
});

module.exports = router;
