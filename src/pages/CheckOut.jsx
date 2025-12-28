import { useFormik } from "formik";
import { useContext, useState } from "react";
import { userContext } from "../context/User.context";
import * as yup from "yup";
import { cartContext } from "../context/Cart.context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function CheckOut() {
	let navigate = useNavigate();
	let [payMethod, setPay] = useState(null);
	let { token } = useContext(userContext);
	let { cartItems, setItems } = useContext(cartContext);
	const basicSchema = yup.object({
		shippingAddress: yup.object({
			city: yup.string().required("Required"),
			phone: yup
				.string()
				.min(10, "your Phone must be more than 10 digits")
				.required("Required"),
			details: yup.string().required("Enter your address"),
		}),
	});
	async function CashPay(values) {
		try {
			let { data } = await axios.request({
				method: "POST",
				url: `https://ecommerce.routemisr.com/api/v1/orders/${cartItems.cartId}`,
				headers: { token },
				data: values,
			});
			if (data.status === "success") {
				setItems([]);
				navigate("/");
			}
		} catch (error) {
			toast.error("Your Cart is Empty");
			navigate("/");
			console.log(error);
		}
	}
	async function onlinePay(values) {
		try {
			let { data } = await axios.request({
				method: "POST",
				url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems.cartId}?url=http://localhost:5173`,
				headers: { token },
				data: { values },
			});
			if (data.status === "success") {
				window.location.href = data.session.url;
			}
		} catch (error) {
			toast.error("Your Cart is Empty");
			navigate("/");
			console.log(error);
		}
	}
	function onSubmit(values) {
		if (payMethod === "cash") {
			CashPay(values);
		} else if (payMethod === "online") {
			onlinePay(values);
		}
	}
	const {
		values,
		handleSubmit,
		handleChange,
		handleBlur,
		touched,
		errors,
		isSubmitting,
	} = useFormik({
		initialValues: {
			shippingAddress: {
				details: "",
				phone: "",
				city: "",
			},
		},
		onSubmit,
		validationSchema: basicSchema,
	});

	return (
		<>
			<Helmet>
				<title>CheckOut</title>
				<meta name="description" content="Welcome to home page" />
			</Helmet>
			<h1 className="mb-4 text-xl text-primary">Shipping Details:</h1>
			<form className="w-full flex gap-3 flex-wrap" onSubmit={handleSubmit}>
				<input
					value={values.shippingAddress.city}
					onChange={handleChange}
					onBlur={handleBlur}
					name="shippingAddress.city"
					type="text"
					placeholder="City..."
					className={`input block w-1/2 ${
						touched.shippingAddress?.city && errors.shippingAddress?.city
							? "border-red-500"
							: ""
					}`}
				></input>
				{errors.shippingAddress?.city ? (
					<p className="text-red-500 w-full block">
						* {errors.shippingAddress.city}
					</p>
				) : (
					""
				)}
				<input
					value={values.shippingAddress.phone}
					onChange={handleChange}
					onBlur={handleBlur}
					name="shippingAddress.phone"
					type="tel"
					placeholder="Mobile"
					className={`input block w-1/2 ${
						touched.shippingAddress?.phone && errors.shippingAddress?.phone
							? "border-red-500"
							: ""
					}`}
				></input>
				{errors.shippingAddress?.phone ? (
					<p className="text-red-500 w-full block">
						* {errors.shippingAddress.phone}
					</p>
				) : (
					""
				)}
				<textarea
					value={values.shippingAddress.details}
					onChange={handleChange}
					onBlur={handleBlur}
					name="shippingAddress.details"
					className="input w-1/2 block h-14"
					placeholder="Your Address"
				></textarea>
				{errors.shippingAddress?.details ? (
					<p className="text-red-500 w-full block">
						* {errors.shippingAddress.details}
					</p>
				) : (
					""
				)}
				<div className="w-1/2 flex gap-3">
					<button
						onClick={() => {
							setPay("cash");
						}}
						disabled={isSubmitting}
						className="btn bg-blue-500 w-1/2"
						type="submit"
					>
						Cash Order
					</button>
					<button
						onClick={() => {
							setPay("online");
						}}
						disabled={isSubmitting}
						className="btn w-1/2"
						type="submit"
					>
						Online Order
					</button>
				</div>
			</form>
		</>
	);
}
