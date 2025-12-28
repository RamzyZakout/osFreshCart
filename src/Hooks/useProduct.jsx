import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetProduct() {
	async function getProducts() {
		return axios.request({
			method: "GET",
			url: "https://ecommerce.routemisr.com/api/v1/products",
		});
	}
	const response = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
		refetchOnMount: true,
		staleTime: 3000,
		refetchOnWindowFocus: true,
		gcTime: 6000,
	});
	return response;
}
