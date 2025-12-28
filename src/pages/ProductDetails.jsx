import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ReactImageGallery from "react-image-gallery";
import { cartContext } from "../context/Cart.context";
import { Helmet } from "react-helmet";

export default function Product() {
	let { id } = useParams();
	let [details, setDetails] = useState(null);
	async function getProduct() {
		const { data } = await axios.request({
			method: "GET",
			url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
		});
		setDetails(data.data);
	}
	let { addToCart } = useContext(cartContext);
	const productImages = details?.images.map((el) => {
		return { original: el, thumbnail: el };
	});
	useEffect(() => {
		getProduct();
	}, []);
	return (
		<>
			{details ? (
				<>
					<Helmet>
						<title>{details.title}</title>
					</Helmet>
					<div className="grid grid-cols-12 gap-6 py-7">
						<div className="col-span-3 overflow-hidden">
							<ReactImageGallery
								items={productImages}
								showNav={false}
								showPlayButton={false}
							/>
						</div>
						<div className="col-span-9">
							<h1 className="font-bold text-2xl text-primary">
								{details.title}
							</h1>
							<h3 className="text-sm">{details.category.name}</h3>
							<h3 className="text-xm mt-3 text-gray-500">
								{details.description}
							</h3>
							<div className="flex justify-between items-center">
								<h1 className="font-bold mt-3 text-xl">{details.price} $</h1>
								<span className="pt-4 mr-8 text-lg font-semibold">
									<i className="fa-solid fa-star text-yellow-400"></i>{" "}
									{details.ratingsAverage}
								</span>
							</div>
							<button
								onClick={() => {
									addToCart({ id: details.id });
								}}
								className="btn w-full mt-3 font-semibold"
							>
								Add To Cart
							</button>
						</div>
					</div>
				</>
			) : (
				<Loading />
			)}
		</>
	);
}
