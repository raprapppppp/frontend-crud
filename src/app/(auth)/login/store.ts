import { create } from "zustand"
import { Login } from "./Route"

interface LoginCred {
	username: string
	password: string
}

interface LoginStore {
	account: LoginCred
	setAccount: (value: Partial<{ username: string; password: string }>) => void
	login: (cred: LoginCred) => Promise<any>
}

export const useLoginStore = create<LoginStore>()((set) => ({
	account: {
		username: "",
		password: "",
	},
	setAccount: (value) =>
		set((state) => ({
			account: { ...state.account, ...value },
		})),
	login: async (cred) => {
		const respose = Login(cred)
		return respose
	},
}))
