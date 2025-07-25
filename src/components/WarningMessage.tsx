import React from "react"
type Message = {
	message: string
}

const WarningMessage: React.FC<Message> = ({ message }) => {
	return (
		<div
			className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
			role="alert">
			{message}
		</div>
	)
}

export default WarningMessage
