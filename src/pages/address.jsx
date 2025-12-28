import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import AddAddress from "../components/addAddress";
export default function Address() {
	const [add, setAdd] = useState(null);
	const { addresses, getAddress, token } = useContext(userContext);

	async function deleteAddress(id) {
		try {
			const { data } = await axios.request({
				method: "DELETE",
				url: `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
				headers: { token },
			});
			toast.success("Your Address has been deleted");
			void data;
		} catch (error) {
			console.log(id);
			console.log(error);
			toast.error("Fail to delete your address");
		}
	}
	useEffect(() => {
		getAddress();
	}, []);
	return (
		<>
			<div className="w-full ">
				<div className="w-full flex gap-x-6 flex-wrap">
					{addresses ? (
						addresses.map((el) => (
							<div
								className="bg-gray-100 rounded-md my-3 p-3 w-1/3"
								key={el.name}
							>
								<h1 className="text-primary font-semibold">
									Name:
									<span className="font-normal text-black">{el.name}</span>
								</h1>
								<h1 className="text-primary font-semibold">
									Phone:
									<span className="font-normal text-black">{el.phone}</span>
								</h1>
								<h1 className="text-primary font-semibold">
									Details:
									<span className="font-normal text-black">{el.details}</span>
								</h1>
								<h1 className="text-primary font-semibold">
									City:
									<span className="font-normal text-black">{el.city}</span>
								</h1>
								<button
									onClick={() => deleteAddress(el._id)}
									className="btn bg-red-500 mt-3 w-full"
								>
									<i className="fa-solid fa-trash-can mr-2"></i> Delete Address
								</button>
							</div>
						))
					) : (
						<Loading />
					)}
				</div>
				<button
					className="btn w-1/2 my-3 "
					onClick={() => {
						if (add) setAdd(null);
						else setAdd("add");
					}}
				>
					{add ? "Dismiss" : "Add Address"}
				</button>
				{add ? (
					<div>
						<AddAddress />
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
}
