import { useContext, useEffect } from "react";
import { userContext } from "../context/User.context";
import { jwtDecode } from "jwt-decode";
import Loading from "../components/Loading";

export default function Data() {
	const { token, addresses, getAddress } = useContext(userContext);
	let { name } = jwtDecode(token);
	useEffect(() => {
		getAddress();
	}, []);
	return (
		<>
			<div className="mt-3 w-3/4 mx-auto flex gap-x-3 items-center">
				<div className="w-16 h-16  bg-gray-300 rounded-full flex justify-center items-center">
					<i className="fa-solid fa-user fa-2x"></i>
				</div>
				<div>
					<div className="flex items-center gap-x-3 bg-gray-100 px-3 py-2 w-full rounded-md mt-2 mx-auto">
						<h1 className="font-semibold text-primary text-sm">User name: </h1>
						<span>{name}</span>
					</div>
				</div>
			</div>
			<div className="mt-3 w-3/4 mx-auto flex flex-wrap gap-x-3 items-center">
				<h1 className="font-semibold text-primary text-sm w-full">
					Addresses:
				</h1>
				<div className="w-full flex flex-wrap gap-x-6">
					{addresses ? (
						addresses.map((el) => (
							<div
								key={el.name}
								className="bg-gray-100 rounded-md my-3 p-3 w-1/3"
							>
								<h1 className="text-primary font-semibold">
									Name:{" "}
									<span className="font-normal text-black">{el.name}</span>
								</h1>
								<h1 className="text-primary font-semibold">
									Phone:{" "}
									<span className="font-normal text-black">{el.phone}</span>
								</h1>
								<h1 className="text-primary font-semibold">
									Details:{" "}
									<span className="font-normal text-black">{el.details}</span>
								</h1>
								<h1 className="text-primary font-semibold">
									City:{" "}
									<span className="font-normal text-black">{el.city}</span>
								</h1>
							</div>
						))
					) : (
						<Loading />
					)}
				</div>
			</div>
		</>
	);
}
