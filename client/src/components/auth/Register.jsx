import { useState } from "react";
import { register } from "../../api/auth";
import styles from "./Auth.module.css";

const Register = () => {
	const [formData, setFormData] = useState({ name: "", email: "", password: "", address: "" });
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await register(formData);
			setError(null);
			setSuccess(true);
		} catch (err) {
			setSuccess(false);
			setError(err.response ? err.response.data.message : "Server error");
		}
	};

	return (
		<div className={styles.authContainer}>
			<h2>Register</h2>
			<form
				onSubmit={handleSubmit}
				className={styles.authForm}
			>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<input
					type="text"
					name="address"
					placeholder="Address"
					value={formData.address}
					onChange={handleChange}
					required
				/>
				<button type="submit">Register</button>
				{error && <p className={styles.errorMesage}>{error}</p>}
				{success && <p className={styles.successMessage}>Registration successful!</p>}
			</form>
		</div>
	);
};

export default Register;
