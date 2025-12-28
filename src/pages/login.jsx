import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userContext } from "../context/User.context";

export default function Login() {
	let { setToken } = useContext(userContext);
	const validateSchema = yup.object().shape({
		email: yup.string().email("Use valid E-mail please").required("Required"),
		password: yup
			.string()
			.min(8, "Pass should be at least 8 char")
			.required("Required"),
	});
	const [errorMsg, setErrorMsg] = useState(null);
	let Nave = useNavigate();
	async function onSubmit(values) {
		let id;
		try {
			id = toast.loading("Waiting...");
			let { data } = await axios({
				method: "POST",
				url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
				data: values,
			});
			toast.dismiss(id);
			toast.success("Your Account has Logged in");
			setTimeout(() => {
				if (data.message === "success") {
					localStorage.setItem("token", data.token);
					setToken(data.token);
					Nave("/");
				}
			}, 2000);
		} catch (error) {
			toast.dismiss(id);
			toast.error(error.response.data.message);
			setErrorMsg(error.response.data.message);
		}
	}
	const {
		values,
		errors,
		handleBlur,
		handleChange,
		handleSubmit,
		isSubmitting,
		touched,
	} = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validateSchema,
		onSubmit,
	});

	return (
		<>
			<div className="flex items-center w-3/4 m-auto  text-primary">
				<i className="fa-regular fa-circle-user me-3 fa-3x font-light"></i>
				<p className="text-2xl">Login: </p>
			</div>
			<form
				className="bg-white p-6 w-3/4 mx-auto rounded-md"
				onSubmit={handleSubmit}
			>
				<div className="w-3/4 my-2 mx-auto flex items-center flex-wrap">
					<label
						htmlFor="email"
						className="w-24 text-xs h-6 font-bold bg-white py-1 px-2 rounded-md text-primary"
					>
						E-mail
					</label>
					<input
						id="email"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
						type="email"
						placeholder="E-mail..."
						className={`${
							errors.email && touched.email ? " border-red-500" : ""
						} input flex-grow ml-3 bg-white`}
					/>
					{errors.email && touched.email ? (
						<p className="text-red-500 mx-auto">* {errors.email}.</p>
					) : (
						""
					)}
				</div>
				<div className="w-3/4 my-2 mx-auto flex items-center flex-wrap">
					<label
						htmlFor="password"
						className="w-24 text-xs h-6 font-bold bg-white py-1 px-2 rounded-md text-primary"
					>
						Password
					</label>
					<input
						id="password"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						type="password"
						placeholder="password"
						className={`${
							errors.password && touched.password ? " border-red-500" : ""
						} input flex-grow ml-3 bg-white`}
					/>
					{errors.password && touched.password ? (
						<p className="text-red-500 mx-auto">* {errors.password}.</p>
					) : (
						""
					)}
					{errorMsg ? (
						<p className="text-red-500 mx-auto">* {errorMsg}.</p>
					) : (
						""
					)}
				</div>
				<div className="w-3/4 px-2 mx-auto mb-3 text-gray-400">
					<h1 className="cursor-pointer w-fit">
						<NavLink to="/Auth/forget">
							{" "}
							<u>Forget my password ?</u>
						</NavLink>
					</h1>
				</div>
				<div className="w-3/4 mx-auto">
					<button
						type="submit"
						disabled={isSubmitting}
						className="btn w-full mt-3"
					>
						Sign In
					</button>
				</div>
			</form>
		</>
	);
}
