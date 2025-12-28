import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { userContext } from "../context/User.context";
import { cartContext } from "../context/Cart.context";
import { wishlistContext } from "../context/wishlist.context";
export default function Navbar() {
	let { token, logOut } = useContext(userContext);
	let { getCartItems, cartItems } = useContext(cartContext);
	let { wishList, getWishList } = useContext(wishlistContext);
	useEffect(() => {
		getCartItems();
	}, []);
	useEffect(() => {
		getWishList();
	}, []);
	return (
		<>
			<nav className="bg-slate-100 fixed top-0 left-0 right-0 z-10">
				<div className="container flex items-center justify-between py-2">
					<img src={logo} />

					<>
						<ul className="flex text-xs gap-5 items-center ml-3 mr-2">
							<li>
								<NavLink to="/">Home</NavLink>
							</li>
							{token && (
								<li>
									<NavLink to="/Cart">Cart</NavLink>
								</li>
							)}
							<li>
								<NavLink to="/Products">Products</NavLink>
							</li>
							<li>
								<NavLink to="/Categories">Categories</NavLink>
							</li>
							<li>
								<NavLink to="/brands">Brands</NavLink>
							</li>
							{token && (
								<li>
									<NavLink to="/allOrders">Orders</NavLink>
								</li>
							)}
						</ul>
						{token && (
							<>
								<Link to="Cart">
									<div className="mx-4 relative">
										<i className="fa-solid fa-cart-shopping"></i>
										<span className="bg-primary text-white absolute top-0 right-0 w-4 h-4 flex justify-center items-center translate-x-1/2 -translate-y-1/2 text-xs rounded-full ">
											{cartItems === null ? (
												<i className="fa-solid fa-spinner fa-spin"></i>
											) : (
												cartItems.numOfCartItems
											)}
										</span>
									</div>
								</Link>
								<Link to="/wishlist">
									<div>
										<i className="fa-solid fa-heart fa-1x"></i>
										<span className="bg-primary text-white absolute top-0 right-0 w-4 h-4 flex justify-center items-center translate-x-3/4 -translate-y-1/2 text-xs rounded-full ">
											{wishList === null ? (
												<i className="fa-solid fa-spinner fa-spin"></i>
											) : (
												wishList.data.length
											)}
										</span>
									</div>
								</Link>
							</>
						)}
					</>

					<div className="sm:block md:hidden ms-auto">
						<i className="fa-solid fa-bars"></i>
					</div>
					{token ? (
						<ul className="md:flex ms-auto gap-2 mr-3 items-center sm:hidden text-base">
							<NavLink to="/userdata">
								<div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center">
									<i className="fa-solid fa-user "></i>
								</div>
							</NavLink>
						</ul>
					) : (
						""
					)}
					{token ? (
						<span
							onClick={logOut}
							className="md:flex sm:hidden hover:text-primary cursor-pointer"
						>
							<i className="fa-solid fa-right-from-bracket"></i>
						</span>
					) : (
						<ul className="sm:ms-auto sm:hidden md:flex gap-2 items-center md:ms-0 text-base">
							<li className="text-xs">
								<NavLink to="/auth/Login">Signin</NavLink>
							</li>
							<li className="text-xs">
								<NavLink to="/auth/Register">SignUp</NavLink>
							</li>
						</ul>
					)}
				</div>
			</nav>
		</>
	);
}
