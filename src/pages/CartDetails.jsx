import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

export default function CartDetails() {
	let { id } = useParams();
	function getDetails() {
		return axios.request({
			method: "GET",
			url: `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
		});
	}
	const { data, isLoading } = useQuery({
		queryKey: ["details"],
		queryFn: getDetails,
	});
	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<div className="flex my-5 gap-5">
				<div className="w-1/3 rounded-md overflow-hidden">
					<img src={data.data.data.image} className="w-full"></img>
				</div>
				<div className="w-full">
					<h1 className="font-bold text-lg mt-3">Category:</h1>
					<h1 className="font-semibold  text-primary ">
						{data.data.data.name}
					</h1>
					<Link to="/Products">
						{" "}
						<button className="btn w-full mt-5">Go to Products</button>
					</Link>
				</div>
			</div>
		</>
	);
}
