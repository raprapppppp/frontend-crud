"use client"
import React, { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useCreateStore } from "@/app/(auth)/register/store"
import { Logout } from "@/api/Routes"
import { useProfileStore } from "@/app/dashboard/store"

const navLink = [
	{
		id: 1,
		name: "Dashboard",
		link: "/dashboard",
	},
	{
		id: 3,
		name: "Users",
		link: "/dashboard/users",
	},
	{
		id: 4,
		name: "Todo",
		link: "/dashboard/todo",
	},
]

const SideNavbar = () => {
	const router = useRouter()
	const pathName = usePathname()
	const { setMessage } = useCreateStore()
	const { profile, setProfile } = useProfileStore()

	useEffect(() => {
		setProfile()
	}, [])

	//Logout
	const handleLogout = async () => {
		try {
			const response = await Logout()
			if (response.ok) {
				console.log("Logout sakses")
				router.push("/login")
				setMessage("")
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			{/* Sidebar */}
			<aside className="w-50 bg-green-700 text-white flex flex-col p-4 shadow-lg rounded-r-xl h-full">
				<div className="font-bold mb-4 text-center border-b-2 pb-4">
					<h1>Welcome!</h1>
					<p className="text-xl uppercase text-yellow-400">
						{profile.username}
					</p>
				</div>

				<nav className="flex-1 ">
					<ul className="space-y-2">
						{navLink.map((nav) => {
							const isActive = pathName === nav.link
							return (
								<Link
									className={`flex items-center px-4 py-2 rounded-lg transition duration-200 ${
										isActive
											? "bg-gray-200 text-green-800"
											: "hover:bg-green-600 text-gray-200"
									}`}
									key={nav.id}
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
		</div>
	)
}

export default SideNavbar
