import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export const userContext = createContext("");
UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
export default function UserProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [addresses, setAddress] = useState(null);
	async function getAddress() {
		try {
			const { data } = await axios.request({
				method: "GET",
				url: "https://ecommerce.routemisr.com/api/v1/addresses",
				headers: { token },
			});
			setAddress(data.data);
		} catch (error) {
			console.log(error);
			toast.error("Can't get your addresses ");
		}
	}

	function logOut() {
		setToken(null);
		localStorage.removeItem("token");
	}
	return (
		<userContext.Provider
			value={{ token, setToken, logOut, addresses, getAddress }}
		>
			{children && children}
		</userContext.Provider>
	);
}
