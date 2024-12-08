import { jwtDecode } from "jwt-decode";
import axios from "./axios";

export const getClientOrders = async token => {
	try {
		const clientData = jwtDecode(token);
		return axios.get(`/orders/?ClientId=${clientData.id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (err) {
		console.error("Error getting orders:", err);
	}
};

export const createOrder = async (orderData, token) => {
	try {
		const res = await axios.post("/orders", orderData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("Order created:", res.data);
	} catch (err) {
		console.error("Error creating order:", err);
	}
};

export const deleteOrder = async (id, token) => {
	try {
		return await axios.delete(`/orders/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (err) {
		console.error("Error deleteing order:", err);
	}
};
