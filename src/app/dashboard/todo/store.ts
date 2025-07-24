import { create } from "zustand"
import { CreateTask, DeleteTask, GetTodos, UpdateTask } from "./Route"

type Task = {
	ID: number
	Task: string
	Completed: boolean
}
interface TodoList {
	tasks: {
		ID: number
		Task: string
		Completed: boolean
	}[]
	setTasks: () => Promise<void>
	addTasks: (newTask: Task) => Promise<void>
	deleteTasks: (delTask: Task) => Promise<Response>
	updateTask: (updateTask: Task) => Promise<void>
}

export const useTodoList = create<TodoList>()((set) => ({
	tasks: [],
	setTasks: async () => {
		const getTask = await GetTodos()
		set({ tasks: getTask })
	},
	addTasks: async (newTask) => {
		const response = await CreateTask(newTask)
		set((state) => ({
			tasks: [...state.tasks, response],
		}))
		console.log(response)
	},
	deleteTasks: async (delTask) => {
		const response = await DeleteTask(delTask)
		if (!response.ok) {
			console.error("Delete failed with status:", response.status)
		}
		set((state) => ({
			tasks: state.tasks.filter((prevTask) => prevTask.ID !== delTask.ID),
		}))
		console.log(response)
		return response
	},
	updateTask: async (updTask) => {
		const response = await UpdateTask(updTask)
		set((state) => ({
			tasks: [
				...state.tasks.map((upd) => (upd.ID === updTask.ID ? response : upd)),
			],
		}))
	},
}))
