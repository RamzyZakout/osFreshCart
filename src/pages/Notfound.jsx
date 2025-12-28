import Error from "../assets/images/error.svg";

export default function Notfound() {
	return (
		<>
			<div className="flex justify-center items-center">
				<img src={Error} alt="" />
			</div>
			<h1 className="w-fit mx-auto text-2xl text-primary font-bold mt-3">
				Page Not Found
			</h1>
		</>
	);
}
