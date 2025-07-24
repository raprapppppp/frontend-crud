import { create } from "zustand"
import { Delete, Edit, GetUsers } from "./Route"

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

interface CrudStore {
	allusers: UserData[]
	setUsers: () => Promise<unknown>
	storeEdit: UserData
	updateStoreEdit: (user: UserData) => void
	inputChangeStoreEdit: (field: string, valaue: string | number) => void
	editUserFetch: (toEdit: UserData) => Promise<unknown>
	deleteUser: (user: UserData) => Promise<unknown>
	tableStatus: string
	setTableStatus: (status: string) => void
	addForm: AddUser
	setAddForm: (user: AddUser) => void
	inputChangeStoreAdd: (field: string, valaue: string | number) => void
}

export const useCrudStore = create<CrudStore>()((set) => ({
	//Storage of all users from api
	allusers: [],
	//Get data from fetch and store it in allUser
	setUsers: async () => {
		const response = await GetUsers()
		set({ allusers: response })
		return response
	},
	//Storage for edit
	storeEdit: {
		id: 0,
		firstname: "",
		lastname: "",
		email: "",
		age: 0,
		birthdate: "",
		phoneNumber: "",
	},
	//Get the prev value and store it in Storage Edit
	updateStoreEdit: (user) => {
		set({ storeEdit: user })
	},
	//Input change
	inputChangeStoreEdit: (field: string, value: string | number) => {
		set((state) => ({
			storeEdit: { ...state.storeEdit, [field]: value },
		}))
	},
	//Fetch edited data
	editUserFetch: async (toEdit) => {
		const response = await Edit(toEdit)
		console.log(response)
		set((state) => ({
			allusers: [
				...state.allusers.map((prevdata) =>
					prevdata.id === toEdit.id ? response : prevdata
				),
			],
		}))
	},
	//Delete
	deleteUser: async (user) => {
		const response = await Delete(user)
		set((state) => ({
			allusers: [
				...state.allusers.filter((prevdata) => prevdata.id !== user.id),
			],
		}))
		return response
	},
	//Table Status
	tableStatus: "table",
	setTableStatus: (stats) => {
		set({ tableStatus: stats })
	},
	//Add
	addForm: {
		firstname: "",
		lastname: "",
		email: "",
		age: 0,
		birthdate: "",
		phoneNumber: "",
	},
	setAddForm: (user) => {
		set({ addForm: user })
	},
	inputChangeStoreAdd: (field: string, value: string | number) => {
		set((state) => ({
			addForm: { ...state.addForm, [field]: value },
		}))
	},
}))

interface SuccessAlert {
	showMessage: boolean
	setShowMessage: () => void
	setHideMessage: () => void
}
// Success Alert
export const useSuccessMessageStore = create<SuccessAlert>()((set) => ({
	showMessage: false,
	setShowMessage: () => {
		set({ showMessage: true })
	},
	setHideMessage: () => {
		set({ showMessage: false })
	},
}))

interface FailedAlert {
	showFailedMessage: boolean
	setShowFailedMessage: () => void
	setHideFailedMessage: () => void
}
//Failed Alert
export const useAlertMessageStore = create<FailedAlert>()((set) => ({
	showFailedMessage: false,
	setShowFailedMessage: () => {
		set({ showFailedMessage: true })
	},
	setHideFailedMessage: () => {
		set({ showFailedMessage: false })
	},
}))
