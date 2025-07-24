import React from "react"

type CardType = {
	title: string
	count: string
	date: string
}

const Card: React.FC<CardType> = ({ title, count, date }) => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-6">
			<h2 className="text-xl font-bold text-yellow-400 mb-2">{title}</h2>
			<p className="text-4xl font-extrabold text-green-700">{count}</p>
			<p className="text-gray-500 mt-2">{date}</p>
		</div>
	)
}

export default Card
