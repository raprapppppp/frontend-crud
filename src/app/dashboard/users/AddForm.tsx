import Input from "@/components/Input"
import React from "react"
import {
	useSuccessMessageStore,
	useCrudStore,
	useAlertMessageStore,
} from "./store"
import { Add } from "./Route"
import SuccessToast from "@/components/SuccessToast"
import WarningMessage from "@/components/WarningMessage"

const AddForm = () => {
	const { addForm, inputChangeStoreAdd, setAddForm } = useCrudStore()
	const { showMessage, setShowMessage, setHideMessage } =
		useSuccessMessageStore()
	const { showFailedMessage, setShowFailedMessage, setHideFailedMessage } =
		useAlertMessageStore()

	const handleAddUsers = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (
			addForm.firstname === "" ||
			addForm.lastname === "" ||
			addForm.email === "" ||
			addForm.age === 0 ||
			addForm.birthdate === "" ||
			addForm.phoneNumber === ""
		) {
			console.log("Dont leave empty")
		} else {
			try {
				const response = await Add(addForm)
				if (response.error === 500) {
					console.log("Email already exist")
					setShowFailedMessage()
					setTimeout(() => {
						setHideFailedMessage()
					}, 3000)
				} else {
					setAddForm({
						firstname: "",
						lastname: "",
						email: "",
						age: 0,
						birthdate: "",
						phoneNumber: "",
					})
					setShowMessage()
					//Hide alert message after 3 seconds
					setTimeout(() => {
						setHideMessage()
					}, 3000)
				}
			} catch (err) {
				console.log(err)
			}
		}
	}
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		if (name === "phoneNumber") {
			const digits = value.replace(/\D/g, "").slice(0, 11)
			inputChangeStoreAdd("phoneNumber", digits)
			return
		}
		if (name === "age") {
			const digits = value.replace(/\D/g, "")
			const num = parseInt(digits, 10)
			inputChangeStoreAdd("age", !isNaN(num) && num > 0 ? num : 0)
			return
		}
		if (name === "firstname" || name === "lastname") {
			// Allow only letters (A-Z, a-z) and space
			const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "")
			inputChangeStoreAdd(name, lettersOnly)
			return
		}
		// Default for other fields
		inputChangeStoreAdd(name, value)
	}

	return (
		<div className="p-6 bg-gray-50 rounded-lg shadow-inner">
			<h2 className="text-2xl font-semibold text-gray-700 mb-4">
				Add New User
			</h2>
			{showMessage && (
				<SuccessToast Alert="Success!" Message="User Added Succesfully" />
			)}
			{showFailedMessage && <WarningMessage message="Email Already Exist" />}

			<form onSubmit={handleAddUsers} className="space-y-4 grid grid-cols-3">
				<Input
					type="text"
					label="Firstname"
					placeholder="Enter your Firsname"
					name="firstname"
					value={addForm.firstname}
					required
					onChange={(e) => handleInputChange(e)}
				/>
				<Input
					type="text"
					label="Lastname"
					placeholder="Enter your Lastname"
					name="lastname"
					value={addForm.lastname}
					required
					onChange={(e) => handleInputChange(e)}
				/>
				<Input
					type="email"
					label="Email"
					placeholder="Enter your Email"
					name="email"
					value={addForm.email}
					required
					onChange={(e) => handleInputChange(e)}
				/>
				<Input
					type="number"
					label="Age"
					placeholder="Enter your Age"
					name="age"
					value={addForm.age}
					required
					onChange={(e) => handleInputChange(e)}
				/>
				<Input
					type="date"
					label="Date of Birth"
					placeholder="Enter your Date of Birth"
					name="birthdate"
					value={addForm.birthdate}
					required
					onChange={(e) => handleInputChange(e)}
				/>
				<Input
					type="text"
					label="Phone Number"
					placeholder="Enter your Phone Number"
					name="phoneNumber"
					value={addForm.phoneNumber}
					required
					onChange={(e) => handleInputChange(e)}
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
	)
}

export default AddForm
