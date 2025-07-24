import { GetProfile } from "@/api/Routes"

import { create } from "zustand"

interface Profile {
	profile: { id: number; username: string; role: string }
	setProfile: () => Promise<unknown>
}

export const useProfileStore = create<Profile>()((set) => ({
	profile: {
		id: 0,
		username: "",
		role: "",
	},
	setProfile: async () => {
		const response = await GetProfile()
		set({ profile: response })
	},
}))
