import axios from "./axios";

export const getRestaurants = async () => {
	try {
		return await axios.get("/restaurants");
	} catch (err) {
		console.error("Error getting restaurants:", err);
	}
};

export const getRestaurantFoods = async id => {
	try {
		return await axios.get(`/restaurants/${id}/foods`);
	} catch (err) {
		console.erroe("Error getting restaurant foods", err);
	}
};
