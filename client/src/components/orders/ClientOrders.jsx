import { useEffect, useState } from "react";
import { deleteOrder, getClientOrders } from "../../api/orders";
import styles from "./Orders.module.css";

const ClientOrders = () => {
	const [orders, setOrders] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchOrders = async () => {
			const token = localStorage.getItem("token");
			const res = await getClientOrders(token);
			if (res.status === 200) setOrders(res.data);
			else setError("Cannot load orders");
		};
		fetchOrders();
	}, []);

	const handleDelete = async orderId => {
		const token = localStorage.getItem("token");
		const res = await deleteOrder(orderId, token);
		if (res.status === 204) {
			setError("");
			setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
		} else setError("Cannot delete order");
	};

	return (
		<div className={styles.clientOrders}>
			<h1>Your orders</h1>
			{error && <p className={styles.errorMessage}>{error}</p>}
			{orders.length === 0 ? (
				<p>Orders are missing</p>
			) : (
				<ul className={styles.orderList}>
					{orders.map(order => (
						<li
							key={order.id}
							className={styles.orderItem}
						>
							<div>
								<p>Order No.{order.id}</p>
								<p>Status: {order.status}</p>
								<p>Restaurant: {order.Restaurant?.name || "Unknown"}</p>
								<ul>
									{order.Food.map(food => (
										<li key={food.id}>{food.name}</li>
									))}
								</ul>
							</div>
							<button
								className={styles.deleteButton}
								onClick={() => handleDelete(order.id)}
							>
								Delete order
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ClientOrders;
