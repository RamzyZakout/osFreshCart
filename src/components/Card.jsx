import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { cartContext } from "../context/Cart.context.jsx";
import toast from "react-hot-toast";
import { wishlistContext } from "../context/wishlist.context.jsx";

export default function Card({ productInfo }) {
	Card.propTypes = {
		productInfo: PropTypes.shape({
			title: PropTypes.string.isRequired,
			imageCover: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			category: PropTypes.shape({
				name: PropTypes.string.isRequired,
			}).isRequired,
			ratingsAverage: PropTypes.number.isRequired,
			_id: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
		}).isRequired,
	};

	const { title, imageCover, price, category, ratingsAverage, _id, id } =
		productInfo;
	let { addToCart } = useContext(cartContext);
	let { wishList, addToWishlist, removeFav } = useContext(wishlistContext);
	let [fav, setFav] = useState(null);
	function favResult() {
		if (fav === "") {
			toast.success("this product added to favorite");
		}

		if (fav === "favorite") {
			toast.success("your product removed ");
			setFav("");
		}
	}
	function markFav() {
		wishList?.data.map((el) => {
			if (el.id === id) setFav("favorite");
		});
	}

	function addToFavorite() {
		if (!fav) {
			addToWishlist({ id });
		} else {
			setFav("");
			removeFav({ id });
		}
		favResult();
	}

	useEffect(() => {
		markFav();
	});
	return (
		<>
			<div className="sm:col-span-6 md:col-span-2 overflow-hidden rounded-md shadow-lg">
				<div className="p-2">
					<div className="overflow-hidden relative">
						<img src={imageCover} className="w-full"></img>
						<div className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 bg-black bg-opacity-0 hover:bg-opacity-30 flex justify-center items-center gap-1">
							<div
								onClick={() => addToFavorite()}
								className="bg-primary w-8 h-7 rounded-full flex items-center justify-center"
							>
								{" "}
								<i
									className={`fa-solid fa-heart opacity-100 ${
										fav ? "text-red-500" : "text-white"
									} <div></div>transition-all duration-300 hover:scale-125 hover:rotate-6`}
								></i>
							</div>
							<div
								onClick={() => {
									addToCart({ id });
								}}
								className="bg-primary w-8 h-7 rounded-full flex items-center justify-center"
							>
								{" "}
								<i className="fa-solid fa-cart-shopping opacity-100 transition-all duration-300 text-white hover:scale-125 hover:rotate-6"></i>
							</div>
							<Link
								to={`products/${_id} `}
								className="bg-primary w-8 h-7 rounded-full flex items-center justify-center"
							>
								{" "}
								<i className="fa-solid fa-eye opacity-100 text-white transition-all duration-300 hover:scale-125 hover:rotate-6"></i>
							</Link>
						</div>
					</div>
				</div>
				<div className="px-2">
					<h2 className="text-primary">{category.name}</h2>
					<h3 className="line-clamp-2 font-semibold">{title}</h3>
					<div className="py-2 flex justify-between items-center">
						<span className="font-semibold">{price} $</span>
						<i className="fa-solid fa-star text-yellow-400">
							<span className="text-black font-light text-xs pl-2">
								{ratingsAverage}
							</span>
						</i>
					</div>
				</div>
			</div>
		</>
	);
}
