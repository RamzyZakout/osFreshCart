import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function CardSlider() {
	const [card, setCard] = useState(null);
	async function getCard() {
		const { data } = await axios({
			method: "GET",
			url: "https://ecommerce.routemisr.com/api/v1/categories",
		});
		setCard(data.data);
	}
	useEffect(() => {
		getCard();
	}, []);
	return (
		<>
			{card ? (
				<section className="my-4">
					<h2 className="font-semibold">Shope Popular Categories</h2>
					<swiper-container loop={true} slides-per-view={6}>
						{card.map((el) => (
							<swiper-slide key={el._id}>
								<Link to={`Categories/${el._id}`}>
									<img src={el.image} className="h-48 w-full object-cover" />
									<h3>{el.name}</h3>
								</Link>
							</swiper-slide>
						))}
					</swiper-container>
				</section>
			) : (
				<Loading />
			)}
		</>
	);
}
