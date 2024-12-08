import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
	const auth = useAuth();

	return auth.getClientData() ? (
		<>{children}</>
	) : (
		<Navigate
			to="/login"
			replace
		/>
	);
};

export default ProtectedRoute;
