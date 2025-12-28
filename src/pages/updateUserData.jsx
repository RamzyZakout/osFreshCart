import { useContext } from "react";
import { userContext } from "../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateUser() {
	let userName = "";
	let newEmail = "";
	let newPhone = "";
	const { token } = useContext(userContext);
	async function changeData(e) {
		e.preventDefault();
		let waite = toast.loading("Waiting...");
		waite;
		try {
			const { data } = await axios.request({
				method: "PUT",
				url: "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
				headers: { token },
				data: { name: userName, email: newEmail, phone: newPhone },
			});
			toast.dismiss(waite);
			toast.success("Your data has been changed");
			void data;
		} catch (error) {
			toast.dismiss(waite);
			toast.error(error.response.data.errors.msg);
			console.log(error);
		}
	}
	return (
		<>
			<div className="mt-5 ml-10">
				<div className="flex items-center gap-x-3">
					<i className="fa-regular fa-circle-user fa-3x text-primary"></i>
					<h1 className="font-bold text-sm">Change your Data:</h1>
				</div>
				<div className="mt-4 w-1/2 mx-auto">
					<form>
						<label
							htmlFor="newName"
							className="w-full block text-sm mb-1 font-bold"
						>
							Change user name
						</label>
						<input
							id="newName"
							type="text"
							onChange={(e) => (userName = e.target.value)}
							className="input w-full block py-4 border border-primary"
							placeholder="Enter new user name"
						></input>

						<input
							id="newEmail"
							type="email"
							onChange={(e) => (newEmail = e.target.value)}
							className="input w-full block my-4 py-4 border border-primary"
							placeholder="Enter new email..."
						></input>
						<input
							id="newPhone"
							type="text"
							onChange={(e) => (newPhone = e.target.value)}
							className="input w-full block py-4 border border-primary"
							placeholder="Enter your phone Number..."
						></input>

						<button
							type="submit"
							className="btn my-4 font-bold w-full"
							onClick={(e) => {
								changeData(e);
							}}
						>
							Update My Data
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
