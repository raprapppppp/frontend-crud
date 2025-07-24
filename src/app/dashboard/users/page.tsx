"use client"

import { useCrudStore } from "./store"
import Table from "./Table"
import AddForm from "./AddForm"
import React from "react"
import { useProfileStore } from "../store"
import Unauthorized from "@/components/Unauthorized"

enum Status {
	Table = "table",
	Create = "create",
}

const Users = () => {
	const { tableStatus, setTableStatus } = useCrudStore()
	const { profile, setProfile } = useProfileStore()

	return (
		<div className="w-full">
			{profile.role === "admin" ? (
				<main className="flex-1 flex flex-col bg-gray-100 p-6">
					{/* Top Bar */}
					<header className="bg-white p-4 rounded-xl shadow-md mb-6 flex justify-between items-center">
						<h1 className="text-2xl font-semibold text-gray-800">
							Users Management
						</h1>
						{tableStatus === Status.Create ? (
							<button
								onClick={() => setTableStatus(Status.Table)}
								className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300">
								<i className="fas fa-plus mr-2"></i> Close
							</button>
						) : (
							<button
								onClick={() => setTableStatus(Status.Create)}
								className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300">
								<i className="fas fa-plus mr-2"></i> Add User
							</button>
						)}
					</header>

					<div className="flex-1 bg-white p-8 rounded-xl shadow-lg overflow-auto">
						{/* Users Table (Read Section) */}
						{tableStatus === Status.Table && <Table />}
						{/* Create User Form */}
						{tableStatus === Status.Create && <AddForm />}
					</div>
				</main>
			) : (
				<div className="w-full h-full flex flex-col items-center justify-center">
					<Unauthorized />
				</div>
			)}
		</div>
	)
}

export default Users
