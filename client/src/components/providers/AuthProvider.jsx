import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";

export const AuthProvider = ({ children }) => {
	const setToken = newToken => localStorage.setItem("token", newToken);

	const removeToken = () => localStorage.removeItem("token");

	const getClientData = () => {
		const token = localStorage.getItem("token");
		if (!token) return;
		try {
			return jwtDecode(token);
		} catch (err) {
			console.error("Invalid token:", err);
		}
	};

	return (
		<AuthContext.Provider value={{ setToken, removeToken, getClientData }}>
			{children}
		</AuthContext.Provider>
	);
};
