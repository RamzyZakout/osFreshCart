import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../context/User.context";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
	ProtectedRoute.propTypes = {
		children: PropTypes.node.isRequired,
	};
	let { token } = useContext(userContext);

	if (token) {
		let { id } = jwtDecode(token);
		if (id) {
			return children;
		}
	} else {
		return <Navigate to="/Auth/Login" />;
	}
}
