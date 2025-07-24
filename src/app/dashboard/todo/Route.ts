type Task = {
	ID: number
	Task: string
	Completed: boolean
}

type SingleTask = {
	Task: string
}

export async function GetTodos() {
	const response = await fetch("http://localhost:4000/task/get", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	})
	const tasks: Task[] = await response.json()
	console.log(tasks)
	return tasks
}

export async function CreateTask(task: SingleTask) {
	const response = await fetch("http://localhost:4000/task/create", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(task),
	})
	const tasks = await response.json()
	return tasks
}

export async function DeleteTask(task: Task) {
	const response = await fetch("http://localhost:4000/task/delete", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(task),
	})
	return response
}

export async function UpdateTask(task: Task) {
	const response = await fetch("http://localhost:4000/task/update", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(task),
	})
	const upData = await response.json()
	return upData
}
