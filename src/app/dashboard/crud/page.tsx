import { GetUsers } from "@/api/Routes"
import React from "react"

const SimpleCrud = async () => {
	const usersData = await GetUsers()

	return (
		<div>
			{usersData.map((prev) => {
				return <div>{prev.age}</div>
			})}
		</div>
	)
}

export default SimpleCrud
