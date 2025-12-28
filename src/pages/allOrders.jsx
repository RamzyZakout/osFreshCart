import { useContext } from "react";
import OrderCard from "../components/OrderCard";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { userContext } from "../context/User.context";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function AllOrders() {
	let { token } = useContext(userContext);
	let { id } = jwtDecode(token);
	async function getOrders() {
		return await axios({
			method: "GET",
			url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
		});
	}
	let { data, isLoading } = useQuery({
		queryKey: ["orders"],
		queryFn: getOrders,
	});
	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Helmet>
				<title>Your Orders</title>
				<meta name="description" content="Welcome to home page" />
			</Helmet>
			{data.data.map((el) => (
				<OrderCard orderData={el} key={el.id} />
			))}
		</>
	);
}
