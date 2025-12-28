import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export let cartContext = createContext(null);

CartProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
export default function CartProvider({ children }) {
	let [cartItems, setItems] = useState(null);
	let { token } = useContext(userContext);

	async function addToCart({ id }) {
		let waiting = toast.loading("Please Waite");
		try {
			let options = {
				method: "POST",
				url: "https://ecommerce.routemisr.com/api/v1/cart",
				headers: { token },
				data: { productId: id },
			};
			let { data } = await axios.request(options);
			toast.dismiss(waiting);
			setItems(data);
			toast.success("Product added to Cart");
		} catch (error) {
			toast.dismiss(waiting);
			toast.error("product didn't add to cart");
			toast.error(error.response.data.message);
		}
	}
	async function getCartItems() {
		try {
			let { data } = await axios.request({
				method: "GET",
				url: "https://ecommerce.routemisr.com/api/v1/cart",
				headers: { token },
			});
			setItems(data);
		} catch (error) {
			if (error.response.data.message.includes("No cart")) {
				setItems([]);
			}
		}
	}
	async function deleteItems({ id }) {
		try {
			const { data } = await axios.request({
				method: "DELETE",
				url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
				headers: { token },
			});
			setItems(data);
			toast.success("Product Deleted from the Cart");
		} catch (error) {
			console.log(error.response.data.message);
			toast.error("product didn't Delete");
		}
	}
	async function updateQuantity({ id, count }) {
		try {
			const { data } = await axios.request({
				method: "PUT",
				url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
				headers: { token },
				data: { count },
			});
			setItems(data);
		} catch (error) {
			console.log(error.response.data.message);
		}
	}
	async function clearCart() {
		try {
			const { data } = await axios.request({
				method: "DELETE",
				url: `https://ecommerce.routemisr.com/api/v1/cart`,
				headers: { token },
			});
			setItems(null);
			void data;
		} catch (error) {
			console.log(error.response.data.message);
		}
	}

	return (
		<cartContext.Provider
			value={{
				addToCart,
				getCartItems,
				cartItems,
				deleteItems,
				updateQuantity,
				clearCart,
				setItems,
			}}
		>
			{children}
		</cartContext.Provider>
	);
}
