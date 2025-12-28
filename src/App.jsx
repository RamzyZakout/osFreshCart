import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Notfound from "./pages/Notfound";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProvider from "./context/User.context";
import Product from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import CartProvider from "./context/Cart.context";
import CheckOut from "./pages/CheckOut";
import AllOrders from "./pages/allOrders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Products from "./pages/Products";
import Wishlist from "./pages/wishlist";
import WishlistProvider from "./context/wishlist.context";
import Categories from "./pages/categories";
import CartDetails from "./pages/CartDetails";
import Brands from "./pages/Brands";
import BrandID from "./pages/brandDetails";
import UserData from "./pages/UserData";
import ForgetPass from "./pages/forgetPassword";
import ChangePass from "./components/changePass";
import UpdateUser from "./pages/updateUserData";
import Address from "./pages/address";
import Data from "./pages/data";

function App() {
	const routes = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{ path: "*", element: <Notfound /> },
				{ index: true, element: <Home /> },
				{ path: "/products/:id", element: <Product /> },
				{ path: "/Categories", element: <Categories /> },
				{ path: "/Products", element: <Products /> },
				{ path: "/brands", element: <Brands /> },
				{ path: "/brands/:id", element: <BrandID /> },
				{
					path: "/cart",
					element: (
						<ProtectedRoute>
							<Cart />
						</ProtectedRoute>
					),
				},
				{
					path: "/CheckOut",
					element: (
						<ProtectedRoute>
							<CheckOut />{" "}
						</ProtectedRoute>
					),
				},
				{
					path: "/allOrders",
					element: (
						<ProtectedRoute>
							<AllOrders />
						</ProtectedRoute>
					),
				},

				{
					path: "/Categories/:id",
					element: (
						<ProtectedRoute>
							<CartDetails />
						</ProtectedRoute>
					),
				},

				{
					path: "/wishlist",
					element: (
						<ProtectedRoute>
							<Wishlist />
						</ProtectedRoute>
					),
				},

				{
					path: "/userdata",
					element: <UserData />,
					children: [
						{ path: "change", element: <ChangePass /> },
						{ path: "reset", element: <ForgetPass /> },
						{ path: "update", element: <UpdateUser /> },
						{ path: "address", element: <Address /> },
						{ path: "data", element: <Data /> },
						{ index: true, element: <Data /> },
					],
				},
			],
		},
		{
			path: "/auth",
			element: <Layout />,
			children: [
				{ path: "Register", element: <Register /> },
				{ path: "Login", element: <Login /> },
				{ path: "forget", element: <ForgetPass /> },
			],
		},
	]);
	const myClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={myClient}>
				<UserProvider>
					<CartProvider>
						<WishlistProvider>
							<RouterProvider router={routes}></RouterProvider>
							<ReactQueryDevtools></ReactQueryDevtools>
							<Toaster />
						</WishlistProvider>
					</CartProvider>
				</UserProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;
