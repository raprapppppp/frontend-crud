type Users = {
	id: number
	firstname: string
	lastname: string
	email: string
	age: number
	birthdate: string
	phoneNumber: string
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
