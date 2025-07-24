type Users = {
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

//Update
export async function Edit(data: Users) {
	const respose = await fetch("http://localhost:4000/api", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(data),
	})
	const editedUser = await respose.json()
	return editedUser
}

//Delete
export async function Delete(data: Users) {
	const response = await fetch("http://localhost:4000/api", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(data),
	})
	return response
}

//Add
export async function Add(data: AddUser) {
	const response = await fetch("http://localhost:4000/api", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(data),
	})
	const addedUser = await response.json()
	console.log(addedUser, "In Route")
	return addedUser
}
