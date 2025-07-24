import React from "react"

type Message = {
	Alert: string
	Message: string
}

const SuccessToast: React.FC<Message> = ({ Alert, Message }) => {
	return (
		<div
			className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
			role="alert">
			<strong className="font-bold">{Alert}</strong>
			<span className="block sm:inline">{Message}</span>
		</div>
	)
}

export default SuccessToast
