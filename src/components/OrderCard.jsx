import PropTypes from "prop-types";

export default function OrderCard({ orderData }) {
	OrderCard.propTypes = {
		orderData: PropTypes.shape({
			id: PropTypes.string.isRequired,
			isDelivered: PropTypes.bool.isRequired,
			isPaid: PropTypes.bool.isRequired,
			cartItems: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string.isRequired,
					product: PropTypes.shape({
						imageCover: PropTypes.string.isRequired,
						title: PropTypes.string.isRequired,
					}).isRequired,
					price: PropTypes.number.isRequired,
				})
			).isRequired,
		}).isRequired,
	};
	return (
		<>
			<article className=" border border-1 border-lightGray rounded-md shadow-sm my-3 p-3">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-gray-400">Order ID</h1>
						<h1 className="font-semibold"># {orderData.id}</h1>
					</div>
					<div className="flex gap-3">
						{orderData.isDelivered ? (
							<h1 className="btn font-cairo h-fit font-semibold rounded-full px-3 py-0">
								تم التوصيل
							</h1>
						) : (
							<h1 className="btn font-cairo bg-blue-500 h-fit font-semibold rounded-full px-3 py-0">
								قيد التوصيل{" "}
							</h1>
						)}
						{orderData.isPaid ? (
							<h1 className="btn font-cairo h-fit font-semibold rounded-full px-3 py-0">
								تم الدفع
							</h1>
						) : (
							<h1 className="btn font-cairo bg-red-600 h-fit font-semibold rounded-full px-3 py-0">
								غير مدفوع{" "}
							</h1>
						)}
					</div>
				</div>
				<div className="flex flex-wrap gap-3">
					{orderData.cartItems.map((el) => (
						<div
							key={el.id}
							className="border border-1 border-gray-200 sm:p-1 md:p-2 sm:w-1/4 md:w-1/6 mt-3"
						>
							<img src={el.product.imageCover} className="w-full mb-2"></img>
							<h1 className="text-xs">
								{el.product.title.split(" ").slice(0, 3).join(" ")}
							</h1>
							<h1 className="text-gray-500">{el.price} $</h1>
						</div>
					))}
				</div>
			</article>
		</>
	);
}
