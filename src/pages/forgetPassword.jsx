import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { userContext } from "../context/User.context";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
	const [show, setShow] = useState(null);
	const [reset, setRe] = useState(null);
	const [error, setError] = useState(null);
	const { logOut } = useContext(userContext);
	const nav = useNavigate();
	let inputValue = "";
	let code = "";
	let newPassword = "";
	const passRole = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

	async function sendCode(e) {
		e.preventDefault();
		if (inputValue !== "") {
			try {
				const { data } = await axios.request({
					method: "POST",
					url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
					data: { email: inputValue },
				});
				toast.success(data.message);
				setShow("show");
				inputValue = "";
			} catch (error) {
				toast.error(error.response.data.message);
			}
		}
	}
	async function verifyCode() {
		if (code !== "") {
			try {
				const { data } = await axios.request({
					method: "POST",
					url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
					data: { resetCode: code },
				});
				toast.success("Correct Code");
				setRe("reset");
				void data;
			} catch (error) {
				toast.error("Incorrect Code");
				void error;
			}
		}
	}
	async function resetPass(e) {
		e.preventDefault();
		if (!newPassword.match(passRole)) {
			return setError(
				"your password should be more thane 8 char and has number, small and large char"
			);
		} else if (inputValue !== "" && newPassword.match(passRole)) {
			let waite = toast.loading("Waiting...");
			waite;
			try {
				const { data } = await axios.request({
					method: "PUT",
					url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
					data: { email: inputValue, newPassword },
				});
				toast.dismiss(waite);
				toast.success("Your Password has been changed");
				newPassword = "";
				setTimeout(logOut(), 2000);
				nav("/auth/login");
				void data;
			} catch (error) {
				toast.dismiss(waite);
				toast.error("Can't change your password");
				void error;
			}
		}
	}
	return (
		<>
			<div className=" w-1/2 mx-auto flex flex-wrap justify-center">
				<div className="flex items-center gap-2 text-primary font-bold text-lg my-6 w-full">
					<i className="fa-solid fa-lock fa-2x"></i>
					<h1> Reset your password:</h1>
				</div>
				<div>
					<form>
						<label htmlFor="email" className="w-full text-sm  font-bold">
							Enter your E-mail:
						</label>
						<input
							id="email"
							type="email"
							onChange={(e) => (inputValue = e.target.value)}
							className="input w-full py-4 border border-primary"
							placeholder="Enter your email..."
						></input>
						<button
							className="btn my-3 w-1/2"
							disabled={show ? true : false}
							onClick={(e) => sendCode(e)}
						>
							Send verification code
						</button>
					</form>
				</div>
				{show ? (
					<div className="my-4">
						<label htmlFor="code" className="w-full text-sm  font-bold">
							Code has been sent to your E-mail
						</label>
						<input
							id="code"
							className="input w-full py-4 border border-primary"
							placeholder="Enter your code here..."
							onChange={(e) => (code = e.target.value)}
						></input>
						<button
							className="btn my-3 w-1/2"
							onClick={() => verifyCode()}
							disabled={reset ? true : false}
						>
							Verify
						</button>
					</div>
				) : (
					""
				)}
				{reset ? (
					<div className="ml-1">
						<form>
							<label htmlFor="resetEmail" className="w-full text-sm  font-bold">
								Enter your E-mail:
							</label>
							<input
								id="resetEmail"
								type="email"
								onChange={(e) => (inputValue = e.target.value)}
								className="input w-full py-4 border border-primary"
								placeholder="Enter your email..."
							></input>
							<input
								id="newPassword"
								type="password"
								onChange={(e) => (newPassword = e.target.value)}
								className="input w-full py-4 border border-primary my-2"
								placeholder="Enter New Password..."
							></input>
							{error ? <p className="text-red-500">*{error}</p> : ""}
							<button className="btn my-3 w-1/2" onClick={(e) => resetPass(e)}>
								Reset My Password
							</button>
						</form>
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
}
