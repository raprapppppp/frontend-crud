import { CreateAcc } from "@/app/(auth)/register/Route"
import { create } from "zustand"

interface Acc {
	username: string
	password: string
}

interface InputType {
	iValue: Acc
	setIvalue: (value: Partial<{ username: string; password: string }>) => void
	createAcc: (acc: Acc) => Promise<unknown>
	message: string
	setMessage: (mess: string) => void
	setMessageToEmpty: () => void
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
		console.log(response)
		return response
	},
	message: "",
	setMessage: (mess) => set({ message: mess }),
	setMessageToEmpty: () => {
		set({ message: "" })
	},
}))
