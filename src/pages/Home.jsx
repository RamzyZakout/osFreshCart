import axios from "axios";
import Loading from "../components/Loading";
import Card from "../components/Card";
import HomeSlider from "../components/HomeSlider";
import CardSlider from "../components/CardSlider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function Home() {
	async function getProduct() {
		return await axios({
			method: "GET",
			url: "https://ecommerce.routemisr.com/api/v1/products",
		});
	}
	let { data, isLoading } = useQuery({
		queryKey: ["product"],
		queryFn: getProduct,
		refetchOnMount: true,
		staleTime: 3000,
		refetchOnWindowFocus: true,
		// gcTime: 6000,
	});
	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<Helmet>
				<title>Home</title>
				<meta name="description" content="Welcome to home page" />
			</Helmet>
			<div className="flex justify-between text-3xl font-semibold text-green-500">
				<h2>Ramzy Waleed Zakout</h2>
				<p>ID: 120220427</p>
			</div>
			<HomeSlider />
			<CardSlider />
			<div className="grid grid-cols-12 gap-3">
				{data.data.data.map((el) => (
					<Card productInfo={el} key={el._id} />
				))}{" "}
			</div>
		</>
	);
}
