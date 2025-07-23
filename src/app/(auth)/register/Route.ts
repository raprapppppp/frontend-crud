interface Accounts {
	username: string
	password: string
}

export async function CreateAcc(account: Accounts) {
	const response = await fetch("http://localhost:4000/account/create", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(account),
	})
	const data = await response.json()
	return data
}
