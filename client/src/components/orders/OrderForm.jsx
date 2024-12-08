import { useState, useEffect } from "react";
import { createOrder } from "../../api/orders";
import { useAuth } from "../../context/AuthContext";
import styles from "./Orders.module.css";
import { getRestaurantFoods, getRestaurants } from "../../api/restaurants";

const OrderForm = () => {
	const auth = useAuth();
	const [restaurants, setRestaurants] = useState([]);
	const [foods, setFoods] = useState([]);
	const [formData, setFormData] = useState({
		ClientId: null,
		RestaurantId: null,
		foodIds: [],
		status: "Pending",
	});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		setFormData(formData => {
			return { ...formData, ClientId: auth.getClientData().id };
		});
		const fetchData = async () => {
			const restaurantRes = await getRestaurants();
			setRestaurants(restaurantRes.data);
		};
		fetchData();
	}, [auth]);

	const handleChange = async e => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		if (name === "RestaurantId" && value) {
			const res = await getRestaurantFoods(value);
			setFoods(res.data);
		} else if (name === "RestaurantId") setFoods([]);
	};

	const handleCheckboxChange = id => {
		const selectedFoods = formData.foodIds.includes(id)
			? formData.foodIds.filter(foodId => foodId !== id)
			: [...formData.foodIds, id];
		setFormData({ ...formData, foodIds: selectedFoods });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			console.log(formData);
			await createOrder(formData, localStorage.getItem("token"));
			setSuccess(true);
			setError(null);
		} catch (err) {
			setSuccess(false);
			setError(err.response ? err.response.data.message : "Server error");
		}
	};

	return (
		<div className={styles.orderContainer}>
			<h2>Create Order</h2>
			<form
				className={styles.orderForm}
				onSubmit={handleSubmit}
			>
				<select
					name="RestaurantId"
					value={formData.RestaurantId ? formData.RestaurantId : ""}
					onChange={handleChange}
					required
				>
					<option value="">Select a Restaurant</option>
					{restaurants.map(restaurant => (
						<option
							key={restaurant.id}
							value={restaurant.id}
						>
							{restaurant.name}
						</option>
					))}
				</select>

				<div className={styles.foodOptions}>
					<p>Select Foods:</p>
					{foods.map(food => (
						<label key={food.id}>
							<input
								type="checkbox"
								value={food.id}
								onChange={() => handleCheckboxChange(food.id)}
							/>
							{food.name} (${food.price})
						</label>
					))}
				</div>

				<button type="submit">Place Order</button>
				{error && <p className={styles.errorMesage}>{error}</p>}
				{success && <p className={styles.successMessage}>Order created successfully!</p>}
			</form>
		</div>
	);
};

export default OrderForm;
