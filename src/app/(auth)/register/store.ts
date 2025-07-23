import { CreateAcc } from "@/app/(auth)/register/Route"
import { create } from "zustand"

interface Acc {
	username: string
	password: string
}

interface InputType {
	iValue: Acc
	setIvalue: (value: Partial<{ username: string; password: string }>) => void
	createAcc: (acc: Acc) => Promise<any>
	message: string
	setMessage: (mess: string) => void
}

export const useCreateStore = create<InputType>()((set) => ({
	iValue: {
		username: "",
		password: "",
	},
	setIvalue: (value) =>
		set((state) => ({
			iValue: { ...state.iValue, ...value },
		})),
	createAcc: async (acc) => {
		const response = await CreateAcc(acc)
		return response
	},
	message: "",
	setMessage: (mess) =>
		set((state) => ({
			message: mess,
		})),
}))
