"use client"

import React, { useEffect } from "react"
import {
	useAlertMessageStore,
	useCrudStore,
	useSuccessMessageStore,
} from "./store"
import SuccessToast from "@/components/SuccessToast"
import WarningMessage from "@/components/WarningMessage"

type UserData = {
	id: number
	firstname: string
	lastname: string
	email: string
	age: number
	birthdate: string
	phoneNumber: string
}

const Table = () => {
	const {
		allusers,
		setUsers,
		storeEdit,
		inputChangeStoreEdit,
		updateStoreEdit,
		editUserFetch,
		deleteUser,
	} = useCrudStore()

	const { showMessage, setShowMessage, setHideMessage } =
		useSuccessMessageStore()
	const { showFailedMessage, setShowFailedMessage, setHideFailedMessage } =
		useAlertMessageStore()

	useEffect(() => {
		setUsers()
	}, [])

	const handleSave = () => {
		const response = editUserFetch(storeEdit)
		console.log(response)
		inputChangeStoreEdit("id", 0)
		setShowMessage()
		setTimeout(() => {
			setHideMessage()
		}, 3000)
	}

	const handleDelete = (user: UserData) => {
		deleteUser(user)
		setShowFailedMessage()
		setTimeout(() => {
			setHideFailedMessage()
		}, 3000)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		if (name === "phoneNumber") {
			const digits = value.replace(/\D/g, "").slice(0, 11)
			inputChangeStoreEdit("phoneNumber", digits)
			return
		}
		if (name === "age") {
			const digits = value.replace(/\D/g, "")
			const num = parseInt(digits, 10)
			inputChangeStoreEdit("age", !isNaN(num) && num > 0 ? num : 0)
			return
		}
		if (name === "firstname" || name === "lastname") {
			// Allow only letters (A-Z, a-z) and space
			const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "")
			inputChangeStoreEdit(name, lettersOnly)
			return
		}
		// Default for other fields
		inputChangeStoreEdit(name, value)
	}

	return (
		<div className="w-full">
			<h2 className="text-2xl font-semibold text-gray-700 mb-4">All Users</h2>
			{showMessage && (
				<SuccessToast Alert="Success! " Message="Edit Successfully" />
			)}
			{showFailedMessage && <WarningMessage message="User Deleted" />}
			<div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-2">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th scope="col" className="table-head">
								ID
							</th>
							<th scope="col" className="table-head">
								First Name
							</th>
							<th scope="col" className="table-head">
								Last Name
							</th>
							<th scope="col" className="table-head">
								Email
							</th>
							<th scope="col" className="table-head">
								Age
							</th>
							<th scope="col" className="table-head">
								Birthdate
							</th>
							<th scope="col" className="table-head">
								Phone Number
							</th>
							<th scope="col" className="table-head">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{allusers.length === 0 && (
							<tr className="">
								<td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
									No users yet. Click &quot;Add User&ldquo; to create one!
								</td>
							</tr>
						)}

						{allusers.map((user) => (
							<tr key={user.id} className="hover:bg-gray-50">
								{storeEdit.id === user.id ? (
									<>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											{user.id}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
											<input
												onChange={(e) => handleInputChange(e)}
												type="text"
												name="firstname"
												value={storeEdit.firstname}
												className="border p-1 max-w-20"
											/>
										</td>
										<td className="table-data">
											<input
												onChange={(e) => handleInputChange(e)}
												type="text"
												name="lastname"
												value={storeEdit.lastname}
												className="border p-1 max-w-20"
											/>
										</td>
										<td className="table-data">
											<input
												onChange={(e) => handleInputChange(e)}
												type="text"
												name="email"
												value={storeEdit.email}
												className="border p-1 max-w-20"
											/>
										</td>
										<td className="table-data">
											<input
												onChange={(e) => handleInputChange(e)}
												type="number"
												name="age"
												value={storeEdit.age}
												className="border p-1 max-w-10"
											/>
										</td>
										<td className="table-data">
											<input
												onChange={(e) => handleInputChange(e)}
												type="text"
												name="birthdate"
												value={storeEdit.birthdate}
												className="border p-1 max-w-20"
											/>
										</td>
										<td className="table-data">
											<input
												onChange={(e) => handleInputChange(e)}
												type="text"
												name="phoneNumber"
												value={storeEdit.phoneNumber}
												className="border p-1 max-w-20"
											/>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<button
												onClick={() => handleSave()}
												className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 mr-2 transition duration-300">
												<i className="fas fa-edit mr-1"></i> Save
											</button>
											<button
												onClick={() => inputChangeStoreEdit("id", 0)}
												className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition duration-300">
												<i className="fas fa-trash-alt mr-1"></i> Cancel
											</button>
										</td>
									</>
								) : (
									<>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											{user.id}
										</td>
										<td className="table-data">{user.firstname}</td>
										<td className="table-data">{user.lastname}</td>
										<td className="table-data">{user.email}</td>
										<td className="table-data">{user.age}</td>
										<td className="table-data">{user.birthdate}</td>
										<td className="table-data">{user.phoneNumber}</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<button
												onClick={() => updateStoreEdit(user)}
												className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 mr-2 transition duration-300">
												<i className="fas fa-edit mr-1"></i> Edit
											</button>
											<button
												onClick={() => handleDelete(user)}
												className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition duration-300">
												<i className="fas fa-trash-alt mr-1"></i> Delete
											</button>
										</td>
									</>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Table
