"use client"
import AlertSuccessful from "@/components/AlertSuccessful"
import ConfirmedDelete from "@/components/ConfirmedDelete"
import Input from "@/components/Input"

import React, { useEffect, useState } from "react"

type UserData = {
	id: number
	firstname: string
	lastname: string
	email: string
	age: number
	birthdate: string
	phoneNumber: string
}

type AddUser = {
	firstname: string
	lastname: string
	email: string
	age: number
	birthdate: string
	phoneNumber: string
}

enum Status {
	Table = "table",
	Create = "create",
}

const Users = () => {
	const [currentSection, setCurrentSection] = useState("table")
	const [alertBox, setAlertBox] = useState(false)
	const [alertEdit, setAlertEdit] = useState(false)
	const [alertDelete, setAlertDelete] = useState(false)
	const [userData, setUserData] = useState<UserData[]>([])
	const [addUser, setAddUser] = useState<AddUser>({
		firstname: "",
		lastname: "",
		email: "",
		age: 0,
		birthdate: "",
		phoneNumber: "",
	})
	const [editForm, setEditForm] = useState({
		id: 0,
		firstname: "",
		lastname: "",
		email: "",
		age: 0,
		birthdate: "",
		phoneNumber: "",
	})

	//Fetch Data to Display in Table
	useEffect(() => {
		const fetchdata = async () => {
			try {
				const response = await fetch("http://localhost:4000/api", {
					method: "GET",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				})
				const data = await response.json()
				setUserData(data)
			} catch (err) {
				console.log(err)
			}
		}

		fetchdata()
	}, [])

	//Get the input
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, type, value } = e.target

		setAddUser((data) => ({
			...data,
			[name]: type === "number" ? Number(value) : value,
		}))
	}

	//Button Func to add user
	const handleAddUsers = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (
			addUser.firstname === "" ||
			addUser.lastname === "" ||
			addUser.email === "" ||
			addUser.age === 0 ||
			addUser.birthdate === "" ||
			addUser.phoneNumber === ""
		) {
			console.log("Dont leave empty")
		} else {
			try {
				const response = await fetch("http://localhost:4000/api", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify(addUser),
				})
				const addedUser = await response.json()
				if (response.status === 202) {
					setUserData((pdata) => [...pdata, addedUser])
					setAddUser({
						firstname: "",
						lastname: "",
						email: "",
						age: 0,
						birthdate: "",
						phoneNumber: "",
					})
					setAlertBox(true)
				} else if (response.status === 500) {
					console.log(Error)
					//setAlertBox(true)
				}
			} catch (err) {
				console.log(err)
			}
		}
	}

	//Edit
	const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { type, name, value } = e.target

		setEditForm((prevData) => ({
			...prevData,
			[name]: type === "number" ? Number(value) : value,
		}))
	}
	//Save Edit
	const handleSave = async () => {
		try {
			const respose = await fetch("http://localhost:4000/api", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify(editForm),
			})

			const data = await respose.json()

			if (respose.ok) {
				console.log("Updated successfully")

				const updatedData = userData.map((allData) => {
					if (allData.id === editForm.id) {
						return data
					} else {
						return allData
					}
				})
				setUserData(updatedData)
				setAlertEdit(true)
			}
		} catch (err) {
			console.log(err)
		}
		setEditForm((prev) => ({ ...prev, id: 0 }))
	}

	//Delete
	const handleDelete = async (user: UserData) => {
		console.log(user)

		try {
			const response = await fetch("http://localhost:4000/api", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify(user),
			})

			if (response.ok) {
				console.log("Deleted")
				const filteredDataAfterDelete = userData.filter(
					(data) => data.id !== user.id
				)
				setUserData(filteredDataAfterDelete)
				setAlertDelete(false)
			}
		} catch (err) {
			console.log(err)
		}
		setAlertDelete(true)
	}

	const handleClose = () => {
		setAlertBox(false)
		setAlertEdit(false)
		setAlertDelete(false)
	}

	return (
		<React.Fragment>
			{/* Main Content Area */}
			<main className="flex-1 flex flex-col bg-gray-100 p-6">
				{/* Top Bar */}
				<header className="bg-white p-4 rounded-xl shadow-md mb-6 flex justify-between items-center">
					<h1 className="text-2xl font-semibold text-gray-800">
						Users Management
					</h1>
					{currentSection === Status.Create ? (
						<button
							onClick={() => setCurrentSection(Status.Table)}
							className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300">
							<i className="fas fa-plus mr-2"></i> Close
						</button>
					) : (
						<button
							onClick={() => setCurrentSection(Status.Create)}
							className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300">
							<i className="fas fa-plus mr-2"></i> Add User
						</button>
					)}
				</header>

				{/* Dynamic Content Area */}
				<div className="flex-1 bg-white p-8 rounded-xl shadow-lg overflow-auto">
					{/* Users Table (Read Section) */}
					{currentSection === Status.Table && (
						<div className="w-full">
							<h2 className="text-2xl font-semibold text-gray-700 mb-4">
								All Users
							</h2>
							<div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												ID
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												First Name
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Last Name
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Email
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Age
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Birthdate
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Phone Number
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
												Action
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{userData.length === 0 && (
											<tr className="">
												<td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
													No users yet. Click &quot;Add User&ldquo; to create
													one!
												</td>
											</tr>
										)}

										{userData.map((user) => (
											<tr key={user.id} className="hover:bg-gray-50">
												{editForm.id === user.id ? (
													<>
														<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
															{user.id}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															<input
																onChange={(e) => handleEditInputChange(e)}
																type="text"
																name="firstname"
																value={editForm.firstname}
																className="border p-1 max-w-20"
															/>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															<input
																onChange={(e) => handleEditInputChange(e)}
																type="text"
																name="lastname"
																value={editForm.lastname}
																className="border p-1 max-w-20"
															/>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															<input
																onChange={(e) => handleEditInputChange(e)}
																type="text"
																name="email"
																value={editForm.email}
																className="border p-1 max-w-20"
															/>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															<input
																onChange={(e) => handleEditInputChange(e)}
																type="number"
																name="age"
																value={editForm.age}
																className="border p-1 max-w-10"
															/>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															<input
																onChange={(e) => handleEditInputChange(e)}
																type="text"
																name="birthdate"
																value={editForm.birthdate}
																className="border p-1 max-w-20"
															/>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															<input
																onChange={(e) => handleEditInputChange(e)}
																type="text"
																name="phoneNumber"
																value={editForm.phoneNumber}
																className="border p-1 max-w-20"
															/>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
															<button
																onClick={() => handleSave()}
																className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2 transition duration-300">
																<i className="fas fa-edit mr-1"></i> Save
															</button>
															<button
																onClick={() =>
																	setEditForm((prev) => ({
																		...prev,
																		id: 0,
																	}))
																}
																className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300">
																<i className="fas fa-trash-alt mr-1"></i> Cancel
															</button>
														</td>
													</>
												) : (
													<>
														<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
															{user.id}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															{user.firstname}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															{user.lastname}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															{user.email}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															{user.age}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															{user.birthdate}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
															{user.phoneNumber}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
															<button
																onClick={() => setEditForm(user)}
																className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2 transition duration-300">
																<i className="fas fa-edit mr-1"></i> Edit
															</button>
															<button
																onClick={() => handleDelete(user)}
																className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300">
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
					)}

					{/* Create User Form */}
					{currentSection === "create" && (
						<div
							id="createUserSection"
							className="p-6 bg-gray-50 rounded-lg shadow-inner">
							<h2 className="text-2xl font-semibold text-gray-700 mb-4">
								Add New User
							</h2>
							<form
								onSubmit={handleAddUsers}
								className="space-y-4 grid grid-cols-3">
								<Input
									type="text"
									label="Firstname"
									placeholder="Enter your Firsname"
									name="firstname"
									value={addUser.firstname}
									required
									onChange={handleInputChange}
								/>
								<Input
									type="text"
									label="Lastname"
									placeholder="Enter your Lastname"
									name="lastname"
									value={addUser.lastname}
									required
									onChange={handleInputChange}
								/>
								<Input
									type="email"
									label="Email"
									placeholder="Enter your Email"
									name="email"
									value={addUser.email}
									required
									onChange={handleInputChange}
								/>
								<Input
									type="number"
									label="Age"
									placeholder="Enter your Age"
									name="age"
									value={addUser.age}
									required
									onChange={handleInputChange}
								/>
								<Input
									type="date"
									label="Date of Birth"
									placeholder="Enter your Date of Birth"
									name="birthdate"
									value={addUser.birthdate}
									required
									onChange={handleInputChange}
								/>
								<Input
									type="text"
									label="Phone Number"
									placeholder="Enter your Phone Number"
									name="phoneNumber"
									value={addUser.phoneNumber}
									required
									onChange={handleInputChange}
								/>
								<div className="flex justify-center space-x-3 col-span-3">
									<button
										type="submit"
										className="px-5 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out">
										Add User
									</button>
								</div>
							</form>
						</div>
					)}

					{alertBox && (
						<AlertSuccessful
							message="Successfully Added"
							onClose={handleClose}
						/>
					)}
					{alertEdit && (
						<AlertSuccessful
							message="Successfully Edited"
							onClose={handleClose}
						/>
					)}
					{alertDelete && (
						<ConfirmedDelete alert="Item Deleted" onCancel={handleClose} />
					)}
				</div>
			</main>
		</React.Fragment>
	)
}

export default Users
