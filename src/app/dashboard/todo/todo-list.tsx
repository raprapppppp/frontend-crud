"use client"

import { useTodoList } from "./store"
import React, { useEffect, useState } from "react"

type Task = {
	ID: number
	Task: string
	Completed: boolean
}

const TodoList = () => {
	const { tasks, setTasks, addTasks, deleteTasks, updateTask } = useTodoList()
	const [newTodo, setNewTodo] = useState({
		ID: 0,
		Task: "",
		Completed: false,
	})

	useEffect(() => {
		setTasks()
	}, [])

	const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		addTasks(newTodo)
		setNewTodo((prev) => ({ ...prev, Task: "" }))
	}

	const handleAddchange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewTodo((prevdata) => ({ ...prevdata, [name]: value }))
	}

	const toggleComplete = (task: Task) => {
		const upTask = { ...task, Completed: true }
		updateTask(upTask)
	}

	const deleteTodo = (task: Task) => {
		deleteTasks(task)
	}

	return (
		<div className="max-w-md max-h-[80vh] overflow-y-auto mx-auto mt-10 px-6 pb-6 bg-white rounded-lg shadow-xl">
			<div className="sticky top-0 bg-white z-10 pt-6">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
					To-Do List
				</h1>

				<form onSubmit={addTodo} className="flex mb-4">
					<input
						type="text"
						name="Task"
						value={newTodo.Task}
						onChange={(e) => handleAddchange(e)}
						placeholder="Add a new task..."
						className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						type="submit"
						className="bg-blue-600 text-white px-5 py-3 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
						Add
					</button>
				</form>
			</div>

			{tasks.length === 0 ? (
				<p className="text-center text-gray-500">No tasks yet. Add some!</p>
			) : (
				<ul>
					{tasks.map((task) => (
						<li
							key={task.ID}
							className="flex items-center justify-between bg-gray-50 p-3 mb-2 rounded-md shadow-sm">
							<span
								className={`flex-grow text-lg ${
									task.Completed
										? "line-through text-gray-400"
										: "text-gray-800"
								}`}>
								{task.Task}
							</span>
							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									checked={task.Completed}
									onChange={() => toggleComplete(task)}
									className="form-checkbox h-5 w-5 text-blue-600 rounded"
								/>
								<button
									onClick={() => deleteTodo(task)}
									className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default TodoList
