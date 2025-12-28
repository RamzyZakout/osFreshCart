import axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "../context/User.context";
import toast from "react-hot-toast";

export default function ChangePass() {
	const [error, setError] = useState(null);
	const { token, logOut } = useContext(userContext);
	let curPassword = "";
	let newPassword = "";
	let conPassword = "";
	const passRole = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
	async function changePass(e) {
		e.preventDefault();
		if (curPassword !== "" && curPassword.match(passRole)) {
			if (newPassword !== "" && newPassword.match(passRole)) {
				if (newPassword === conPassword) {
					let wait = toast.loading("Waiting...");
					wait;
					try {
						const { data } = await axios.request({
							method: "PUT",
							url: "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
							headers: { token },
							data: {
								currentPassword: curPassword,
								password: newPassword,
								rePassword: conPassword,
							},
						});
						toast.dismiss(wait);
						toast.success("your password has been changed");
						setTimeout(logOut(), 2000);
						void data;
					} catch (error) {
						toast.dismiss(wait);
						toast.error(error.response.data.message);
					}
				} else setError("Incorrect Confirmation for Password");
			} else setError("your password should have number,small and larg char");
		} else setError("Enter your currant password right");
	}
	return (
		<>
			<div className="mt-4  ml-10  ">
				<div className="flex gap-x-3 font-bold items-center text-sm">
					<i className="fa-solid fa-right-left text-primary fa-2x"></i>
					<h1>Change your Password: </h1>
				</div>
				<div className="w-1/2 mt-5">
					<label>Enter your currant password:</label>
					<input
						id="currantPassword"
						type="password"
						onChange={(e) => (curPassword = e.target.value)}
						className="input w-full py-4 border border-primary my-2"
						placeholder="Enter Currant Password..."
					></input>
					<label>Enter your New password</label>
					<input
						id="newPassword"
						type="password"
						onChange={(e) => (newPassword = e.target.value)}
						className="input w-full py-4 border border-primary my-2"
						placeholder="Enter New Password..."
					></input>
					<input
						id="conPassword"
						type="password"
						onChange={(e) => (conPassword = e.target.value)}
						className="input w-full py-4 border border-primary my-2"
						placeholder="Confirm Password..."
					></input>
					{error ? <p className="text-red-600">* {error}</p> : ""}
					<button className="btn my-3 w-full" onClick={(e) => changePass(e)}>
						Change My Password
					</button>
				</div>
			</div>
		</>
	);
}
