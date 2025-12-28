import amazonPay from "../assets/images/amazon-pay.png";
import american from "../assets/images/American-Express-Color.png";
import master from "../assets/images/mastercard.webp";
import paypal from "../assets/images/paypal.png";
import appStore from "../assets/images/get-apple-store.png";
import playStore from "../assets/images/get-google-play.png";

export default function Footer() {
	return (
		<>
			<footer className="bg-slate-100 absolute bottom-0 left-0 w-full pt-6 pb-9">
				<div className="container">
					<h2 className="font-semibold mb-1">Get the FreshGet app</h2>
					<p className="text-gray-400 mb-2">
						We will send you a link, Open it on your phone to download the app.
					</p>
					<div className="flex gap-3 justify-between items-center mb-3">
						<input placeholder="Email..." className="input flex grow"></input>
						<button className="btn">Share App Link</button>
					</div>
					<hr />
					<div className="flex justify-between items-center py-2">
						<div className="flex items-center gap-2">
							<p>Payment Partners </p>
							<img src={amazonPay} className="w-10"></img>
							<img src={american} className="w-10"></img>
							<img src={master} className="w-10"></img>
							<img src={paypal} className="w-10"></img>
						</div>
						<div className="flex gap-2 items-center ms-auto">
							<p>Get deliveries with FreshCart</p>
							<img src={appStore} className="w-16"></img>
							<img src={playStore} className="w-16"></img>
						</div>
					</div>
					<hr></hr>
				</div>
			</footer>
		</>
	);
}
