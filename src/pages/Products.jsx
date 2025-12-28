import Loading from "../components/Loading";
import Card from "../components/Card";
import useOnline from "../Hooks/useOnline";
import useGetProduct from "../Hooks/useProduct";
import { Helmet } from "react-helmet";

export default function Products() {
	const isOnline = useOnline();
	const { data, isLoading, isError, error } = useGetProduct();
	if (isLoading) {
		return <Loading />;
	}
	if (isError) {
		return error;
	}

	return (
		<>
			<Helmet>
				<title>Products</title>
				<meta name="description" content="Welcome to home page" />
			</Helmet>
			{isOnline ? (
				""
			) : (
				<h1 className="bg-red-500 text-white">No internet connection</h1>
			)}
			<div className="grid grid-cols-12 gap-3">
				{data.data.data.map((el) => (
					<Card productInfo={el} key={el._id} />
				))}{" "}
			</div>
		</>
	);
}
