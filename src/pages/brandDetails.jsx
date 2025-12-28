import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";

export default function BrandID() {
	const { id } = useParams();
	async function getBrand() {
		return await axios.request({
			method: "GET",
			url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
		});
	}
	const { data } = useQuery({ queryKey: ["brands"], queryFn: getBrand });
	const details = data?.data.data || null;

	return (
		<>
			{details ? (
				<>
					<Helmet>
						<title>{details.name}</title>
					</Helmet>
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-6 overflow-hidden ">
							<img src={details.image} />
						</div>
						<div className="col-span-6 pt-10 ">
							<h1 className="font-bold text-2xl text-primary">
								{details.name}
							</h1>
							<h3 className="text-sm">{details.slug}</h3>

							<Link to="/brands">
								{" "}
								<button className="btn w-full mt-3 font-semibold">
									Back to brands
								</button>
							</Link>
						</div>
					</div>
				</>
			) : (
				<Loading />
			)}
		</>
	);
}
