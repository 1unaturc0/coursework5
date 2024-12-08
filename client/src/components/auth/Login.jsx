import { useState } from "react";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import styles from "./Auth.module.css";

const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const auth = useAuth();

	const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const res = await login(formData);
			auth.setToken(res.data.token);
			setError(null);
			setSuccess(true);
		} catch (err) {
			setSuccess(false);
			setError(err.response ? err.response.data.message : "Server error");
		}
	};

	return (
		<div className={styles.authContainer}>
			<h2>Login</h2>
			<form
				onSubmit={handleSubmit}
				className={styles.authForm}
			>
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
				<button type="submit">Login</button>
				{error && <p className={styles.errorMesage}>{error}</p>}
				{success && <p className={styles.successMessage}>Login successful!</p>}
			</form>
		</div>
	);
};

export default Login;
