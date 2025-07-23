interface LoginType {
	username: string
	password: string
}

export async function Login(acc: LoginType) {
	const response = await fetch("http://localhost:4000/account/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(acc),
	})
	const data = await response.json()
	return data
}
