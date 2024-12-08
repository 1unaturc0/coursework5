const express = require("express");
const Food = require("../models/food");
const router = express.Router();

router.get("/", async (_, res) => {
	const foods = await Food.findAll();
	res.json(foods);
});

router.get("/:id", async (req, res) => {
	const food = await Food.findByPk(req.params.id);
	if (food) res.json(food);
	else res.status(404).send("Food not found");
});

router.post("/", async (req, res) => {
	const food = await Food.create(req.body);
	res.status(201).json(food);
});

router.put("/:id", async (req, res) => {
	const food = await Food.findByPk(req.params.id);
	if (food) {
		await food.update(req.body);
		res.json(food);
	} else res.status(404).send("Food not found");
});

router.delete("/:id", async (req, res) => {
	const food = await Food.findByPk(req.params.id);
	if (food) {
		await food.destroy();
		res.status(204).send();
	} else res.status(404).send("Food not found");
});

module.exports = router;
