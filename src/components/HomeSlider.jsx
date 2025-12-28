import image1 from "../assets/images/slider-image-1.jpeg";
import image2 from "../assets/images/slider-image-2.jpeg";
import image3 from "../assets/images/slider-image-3.jpeg";

export default function HomeSlider() {
	return (
		<>
			<div className="grid grid-cols-12 pb-3">
				<div className="col-span-8 h-full">
					<swiper-container loop={true} style={{ height: "100%" }}>
						<swiper-slide>
							<img src={image1} className="w-full h-full object-cover" />
						</swiper-slide>
						<swiper-slide>
							<img src={image2} className="w-full h-full object-cover" />
						</swiper-slide>
						<swiper-slide>
							<img src={image3} className="w-full h-full object-cover" />
						</swiper-slide>
					</swiper-container>
				</div>
				<div className="col-span-4 h-full">
					<img src={image2} className="w-full h-1/2" />
					<img src={image1} className="w-full h-1/2" />
				</div>
			</div>
		</>
	);
}
