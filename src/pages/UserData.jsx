import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function UserData() {
	const [num, setNum] = useState("1");
	function set(e) {
		setNum(e.target.id);
	}
	return (
		<>
			<div className="grid grid-cols-12 pt-5 gap-x-6">
				<div className="col-span-3 bg-gray-200 h-72 p-3 rounded-md mb-6">
					<Link
						to="data"
						className={`${num === "1" ? "text-primary" : ""}`}
						onClick={(e) => set(e)}
					>
						<h1 id={1} className={`slice `}>
							User Data
						</h1>
					</Link>
					<Link
						to="change"
						className={`${num === "2" ? "text-primary" : ""}`}
						onClick={(e) => set(e)}
					>
						<h1 id={2} className={`slice `}>
							Change Password
						</h1>
					</Link>
					<Link
						to="reset"
						className={`${num === "3" ? "text-primary" : ""}`}
						onClick={(e) => set(e)}
					>
						<h1 id={3} className="slice">
							Reset Password
						</h1>
					</Link>
					<Link
						to="address"
						className={`${num === "4" ? "text-primary" : ""}`}
						onClick={(e) => set(e)}
					>
						<h1 id={4} className="slice">
							ُModify Your Addresses
						</h1>
					</Link>
					<Link
						to="update"
						className={`${num === "5" ? "text-primary" : ""}`}
						onClick={(e) => set(e)}
					>
						<h1 id={5} className="slice">
							Update user data
						</h1>
					</Link>
				</div>
				<div className="col-span-8">
					<Outlet />
				</div>
			</div>
		</>
	);
}
