"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

{
	/* Sidebar */
}
const navLink = [
	{
		name: "Dashboard",
		link: "/dashboard",
	},
	{
		name: "Pages",
		link: "/dashboard/pages",
	},
	{
		name: "Users",
		link: "/dashboard/users",
	},
	{
		name: "Setting",
		link: "/dashboard/settings",
	},
]

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()

	//Logout
	const handleLogout = async () => {
		try {
			const response = await fetch("http://localhost:3001/api/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			})

			if (response.ok) {
				console.log("Logout sakses")
				router.push("/login")
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="min-h-screen flex">
			{/* Sidebar */}
			<aside className="w-64 bg-green-700 text-white flex flex-col p-4 shadow-lg rounded-r-xl">
				<div className="text-2xl font-bold mb-8 text-center">Admin Panel</div>
				<nav className="flex-1 ">
					<ul className="space-y-2">
						{navLink.map((nav, i) => {
							return (
								<Link
									className="flex items-center px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
									key={i}
									href={nav.link}>
									<i className="fas fa-tachometer-alt mr-3"></i> {nav.name}
								</Link>
							)
						})}
					</ul>
				</nav>

				<div className="mt-auto text-sm text-gray-300 text-center flex flex-col gap-5 ">
					<button
						onClick={handleLogout}
						className="px-4 py-2 flex-1 w-full text-center border-2 rounded-xl hover:bg-gray-200 hover:text-green-900 transition ease-in-out">
						Logout
					</button>
					<p>&copy; 2025 CARD MRI</p>
				</div>
			</aside>
			{children}
		</div>
	)
}
