import { useContext } from "react";
import Loading from "../components/Loading";
import { wishlistContext } from "../context/wishlist.context";
import { Link } from "react-router-dom";

export default function Wishlist() {
	let { wishList, removeFav } = useContext(wishlistContext);

	return (
		<>
			{wishList === null ? (
				<Loading />
			) : (
				<div className="flex flex-wrap gap-3">
					{wishList.data.length === 0 ? (
						<div className="mx-auto w-fit text-center py-16">
							<p className="">There Are Not Items Yet.</p>
							<Link to="/">
								<button className="btn text-xs mt-4">
									ADD Your First Product To Your Favorite
								</button>
							</Link>
						</div>
					) : (
						wishList.data?.map((el) => (
							<div
								key={el._id}
								className="border border-1 border-gray-200 sm:p-1 md:p-2 sm:w-1/4 md:w-1/6 mt-3"
							>
								<div className="relative">
									<img src={el.imageCover} className="w-full mb-2"></img>
									<div className="bg-black flex items-center justify-center absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 bg-opacity-30">
										<Link
											to={`/products/${el._id} `}
											className="bg-primary w-8 h-7 rounded-full flex items-center justify-center"
										>
											{" "}
											<i className="fa-solid fa-eye opacity-100 text-white transition-all duration-300 hover:scale-125 hover:rotate-6"></i>
										</Link>
									</div>
								</div>
								<h1 className="text-xs">
									{el.title?.split(" ").slice(0, 3).join(" ")}
								</h1>
								<h1 className="text-gray-500">{el.price} $</h1>
								<button
									onClick={() => removeFav({ id: el._id })}
									className="btn mt-2 bg-red-500"
								>
									<i className="fa-solid fa-trash-can mr-2"></i>Remove
								</button>
							</div>
						))
					)}
				</div>
			)}
		</>
	);
}
