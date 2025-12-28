import axios from "axios";
import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export const wishlistContext = createContext();

export default function WishlistProvider({ children }) {
	WishlistProvider.propTypes = {
		children: PropTypes.node.isRequired,
	};
	let [wishList, setWish] = useState(null);
	let { token } = useContext(userContext);

	async function getWishList() {
		try {
			let { data } = await axios.request({
				url: "https://ecommerce.routemisr.com/api/v1/wishlist",
				method: "GET",
				headers: { token },
			});
			setWish(data);
		} catch (error) {
			void error;
		}
	}
	async function addToWishlist({ id }) {
		try {
			let option = {
				method: "POST",
				url: "https://ecommerce.routemisr.com/api/v1/wishlist",
				headers: { token },
				data: { productId: id },
			};
			let { data } = await axios.request(option);
			setWish(data);
			getWishList();
		} catch (error) {
			toast.error(error);
		}
	}
	async function removeFav({ id }) {
		try {
			let option = {
				url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
				method: "DELETE",
				headers: { token },
			};
			let { data } = await axios.request(option);
			setWish(data);
			getWishList();
		} catch (error) {
			void error;
		}
	}

	return (
		<>
			<wishlistContext.Provider
				value={{ wishList, getWishList, addToWishlist, removeFav }}
			>
				{children}
			</wishlistContext.Provider>
		</>
	);
}
