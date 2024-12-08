import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import Header from "./Header";
import Register from "./auth/Register";
import Login from "./auth/Login";
import OrderForm from "./orders/OrderForm";
import ClientOrders from "./orders/ClientOrders";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<Routes>
					<Route
						path="/"
						element={<></>}
					/>
					<Route
						path="/register"
						element={<Register />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/create-order"
						element={
							<ProtectedRoute>
								<OrderForm />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/my-orders"
						element={<ClientOrders />}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
};

export default App;
