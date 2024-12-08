const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Client = require("../models/client");

const router = express.Router();

router.get("/", async (_, res) => {
	const clients = await Client.findAll();
	res.json(clients);
});

router.get("/:id", async (req, res) => {
	const client = await Client.findByPk(req.params.id);
	if (client) res.json(client);
	else res.status(404).send("Client not found");
});

router.post("/", async (req, res) => {
	const client = await Client.create(req.body);
	res.status(201).json(client);
});

router.put("/:id", async (req, res) => {
	const client = await Client.findByPk(req.params.id);
	if (client) {
		await client.update(req.body);
		res.json(client);
	} else res.status(404).send("Client not found");
});

router.delete("/:id", async (req, res) => {
	const client = await Client.findByPk(req.params.id);
	if (client) {
		await client.destroy();
		res.status(204).send();
	} else res.status(404).send("Client not found");
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const client = await Client.findOne({ where: { email } });
		if (!client) return res.status(404).json({ message: "Client not found" });
		const isPasswordValid = await bcrypt.compare(password, client.password);
		if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });
		const token = jwt.sign({ id: client.id, email: client.email }, process.env.SECRET_KEY, {
			expiresIn: "24h",
		});
		res.json({ token });
	} catch {
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
