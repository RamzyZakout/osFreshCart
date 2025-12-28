import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {
	let passRole = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
	const validateSchema = yup.object().shape({
		name: yup
			.string("UserName should be Text")
			.min(5, "user should be more than 5 char")
			.required("Required"),
		email: yup.string().email("Use valid E-mail please").required("Required"),
		password: yup
			.string()
			.min(8, "Pass should be at least 8 char")
			.required("Required")
			.matches(passRole, "Pass should have big &small &special char"),
		rePassword: yup
			.string()
			.required("Required")
			.oneOf([yup.ref("password", "Re-password should be the same password")]),
		phone: yup
			.string()
			.min(10, "Number Should be 10 digits")
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
				url: "https://ecommerce.routemisr.com/api/v1/auth/signup?",
				data: values,
			});
			toast.dismiss(id);
			toast.success("Your Account has been Created");
			setTimeout(() => {
				if (data.message === "success") Nave("auth/Login");
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
			name: "",
			email: "",
			password: "",
			rePassword: "",
			phone: "",
		},
		validationSchema: validateSchema,
		onSubmit,
	});

	return (
		<>
			<div className="flex items-center w-3/4 m-auto  text-primary">
				<i className="fa-regular fa-circle-user me-3 fa-3x font-light"></i>
				<p className="text-2xl">Register Now: </p>
			</div>
			<form
				className="bg-white p-6 w-3/4 mx-auto rounded-md"
				onSubmit={handleSubmit}
			>
				<div className="w-3/4 my-2 mx-auto flex items-center flex-wrap">
					<label
						htmlFor="name"
						className="w-24 text-xs h-6 font-bold bg-white py-1 px-2 rounded-md text-primary"
					>
						UserName
					</label>
					<input
						id="name"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.name}
						placeholder="UserName"
						className={`${
							errors.name && touched.name ? " border-red-500" : ""
						} input flex-grow ml-3 bg-white`}
					/>
					{errors.name && touched.name ? (
						<p className="text-red-500 mx-auto">* {errors.name}.</p>
					) : (
						""
					)}
				</div>
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
					{errorMsg ? (
						<p className="text-red-500 mx-auto">* {errorMsg}.</p>
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
				</div>
				<div className="w-3/4 my-2 mx-auto flex items-center flex-wrap">
					<label
						htmlFor="rePassword"
						className="w-24 text-xs h-6 font-bold bg-white py-1 px-2 rounded-md text-primary"
					>
						Re-password
					</label>
					<input
						id="rePassword"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.rePassword}
						type="password"
						placeholder="Re-password"
						className={`${
							errors.rePassword && touched.rePassword ? " border-red-500" : ""
						} input flex-grow ml-3 bg-white`}
					/>
					{errors.rePassword && touched.rePassword ? (
						<p className="text-red-500 mx-auto">* {errors.rePassword}.</p>
					) : (
						""
					)}
				</div>
				<div className="w-3/4 my-2 mx-auto flex items-center flex-wrap">
					<label
						htmlFor="phone"
						className="w-24 text-xs h-6 font-bold bg-white py-1 px-2 rounded-md text-primary"
					>
						Phone (+20)
					</label>
					<input
						id="phone"
						onChange={handleChange}
						onBlur={handleBlur}
						type="number"
						value={values.phone}
						placeholder="Phone"
						className={`${
							errors.phone && touched.phone ? " border-red-500" : ""
						} input flex-grow ml-3 bg-white`}
					/>
					{errors.phone && touched.phone ? (
						<p className="text-red-500 mx-auto">* {errors.phone}.</p>
					) : (
						""
					)}
				</div>
				<div className="w-3/4 mx-auto">
					<button
						type="submit"
						disabled={isSubmitting}
						className="btn w-full mt-3"
					>
						Sign Up
					</button>
				</div>
			</form>
		</>
	);
}
