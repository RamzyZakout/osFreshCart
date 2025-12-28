import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import { userContext } from "../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
export default function AddAddress() {
	const { token } = useContext(userContext);
	const basicSchema = yup.object({
		name: yup
			.string()
			.min(3, "your name should be 3 or more thane 3 char")
			.required("Required"),
		details: yup
			.string()
			.min(5, "your address should be 3 or more thane 3 char")
			.required("Required"),
		phone: yup
			.string()
			.min(8, "your phone number should be 8 or more thane 8 numbers")
			.required("Required"),
		city: yup
			.string()
			.min(3, "your city name should be 3 or more thane char")
			.required("Required"),
	});
	const { isSubmitting, errors, touched, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				name: "",
				details: "",
				phone: "",
				city: "",
			},
			onSubmit,
			validationSchema: basicSchema,
		});
	async function onSubmit(values) {
		try {
			const { data } = await axios.request({
				method: "POST",
				url: "https://ecommerce.routemisr.com/api/v1/addresses",
				headers: { token },
				data: values,
			});
			toast.success("your address has been added");
			void data;
		} catch (error) {
			toast.error("your address didn't add");
			console.log(error);
		}
	}
	return (
		<>
			<div className=" my-5">
				<h1 className="text-primary font-semibold mb-3">
					Please Enter Address Details:
				</h1>
				<form onSubmit={handleSubmit} className="flex flex-wrap gap-3 w-full">
					<input
						id="name"
						type="text"
						onChange={handleChange}
						className="input w-1/3 py-4 border border-primary"
						placeholder="Name..."
					></input>
					{errors.name && touched.name ? (
						<p className="text-red-500">* {errors.name}</p>
					) : (
						""
					)}
					<input
						id="phone"
						type="text"
						onChange={handleChange}
						className="input w-1/3 py-4 border border-primary"
						placeholder="Phone Number..."
					></input>
					{errors.phone && touched.phone ? (
						<p className="text-red-500">* {errors.phone}</p>
					) : (
						""
					)}
					<input
						id="city"
						type="text"
						onChange={handleChange}
						className="input w-1/3 py-4 border border-primary"
						placeholder="City..."
					></input>
					{errors.city && touched.city ? (
						<p className="text-red-500">* {errors.city}</p>
					) : (
						""
					)}
					<input
						id="details"
						type="text"
						onChange={handleChange}
						className="input w-1/3 py-4 border border-primary"
						placeholder="Details..."
					></input>
					{errors.details && touched.details ? (
						<p className="text-red-500">* {errors.details}</p>
					) : (
						""
					)}
					<button
						type="submit"
						className="btn bg-blue-500"
						disabled={isSubmitting}
					>
						Add Address
					</button>
				</form>
			</div>
		</>
	);
}
