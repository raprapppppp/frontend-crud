type Users = {
	id: number
	firstname: string
	lastname: string
	email: string
	age: number
	birthdate: string
	phoneNumber: string
}

type Profile = {
	id: number
	username: ""
	role: ""
}

//Get
export async function GetUsers() {
	const response = await fetch("http://localhost:4000/api", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	})

	const data: Users[] = await response.json()
	return data
}

//Logout
export async function Logout() {
	const response = await fetch("http://localhost:4000/task/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	})

	return response
}

//GetProfile
export async function GetProfile() {
	const response = await fetch("http://localhost:4000/get/profile", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	})
	const prof: Profile = await response.json()
	return prof
}
