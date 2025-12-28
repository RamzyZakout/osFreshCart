import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../context/Cart.context";
import Loading from "../components/Loading";
import CartItems from "../components/CartItems";
import { Helmet } from "react-helmet";

export default function Cart() {
	let { cartItems, clearCart, getCartItems } = useContext(cartContext);
	useEffect(() => {
		getCartItems();
	});
	function map() {
		let a = [];
		let items = cartItems.data.products;
		if (items.length > 0) {
			for (let i = 0; i < items.length; i++) {
				a.push(<CartItems cartItem={items[i]} key={items[i]._id} />);
			}
		}

		return a;
	}
	return (
		<>
			<Helmet>
				<title>Your Cart</title>
				<meta name="description" content="Welcome to home page" />
			</Helmet>
			{cartItems === null ? (
				<Loading />
			) : (
				<div className="bg-slate-100 p-4 rounded-lg">
					<h1 className="text-sm">
						Shop Cart <i className="fa-solid fa-cart-shopping"></i>
					</h1>
					<h1 className="mt-3 text-primary text-sm font-semibold">
						Total price for your Cart is: {cartItems.data.totalCartPrice} $
					</h1>
					{cartItems.numOfCartItems === 0 ? (
						<div className="mx-auto w-fit text-center py-16">
							<p className="">There Are Not Items Yet.</p>
							<Link to="/">
								<button className="btn text-xs mt-4">
									ADD Your First Product To Your Cart
								</button>
							</Link>
						</div>
					) : (
						<>
							{" "}
							{map()}{" "}
							<div className=" flex justify-end">
								<button
									onClick={() => {
										clearCart();
									}}
									className="btn bg-red-500 mt-4"
								>
									Clear Cart
								</button>
							</div>{" "}
						</>
					)}
				</div>
			)}
			<Link
				to="/CheckOut"
				className="btn ms-auto w-fit block mt-3 hover:text-white"
			>
				Check Out
			</Link>
		</>
	);
}
