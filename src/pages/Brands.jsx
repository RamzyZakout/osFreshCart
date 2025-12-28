import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
	async function getBrands() {
		return await axios.request({
			method: "GET",
			url: "https://ecommerce.routemisr.com/api/v1/brands",
		});
	}
	const { data, isLoading } = useQuery({
		queryKey: ["brands"],
		queryFn: getBrands,
	});
	if (isLoading) return <Loading />;
	else
		return (
			<>
				<Helmet>
					<title>Brands</title>
				</Helmet>
				<div className="flex flex-wrap gap-8 justify-center mt-6">
					{!data ? (
						<Loading />
					) : Array.isArray(data?.data?.data) ? (
						data.data.data.map((brand) => (
							<div
								key={brand._id}
								className="border relative border-1 border-gray-200 sm:p-1 md:p-2 sm:w-1/4 mt-3"
							>
								<div className="bg-black flex items-center justify-center absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 bg-opacity-30">
									<Link
										to={`/brands/${brand._id}`}
										className="bg-primary w-8 h-7 rounded-full flex items-center justify-center"
									>
										<i className="fa-solid fa-eye opacity-100 text-white transition-all duration-300 hover:scale-125 hover:rotate-6"></i>
									</Link>
								</div>
								<img
									src={brand.image}
									className="w-full h-44 object-contain mb-2"
								></img>
								<h1 className="text-xs">{brand.name}</h1>
							</div>
						))
					) : (
						""
					)}
				</div>
			</>
		);
}
