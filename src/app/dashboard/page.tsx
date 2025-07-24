import Card from "@/components/Card"
import React from "react"

const Dashboard = () => {
	return (
		<div className="flex-1 flex flex-col p-4">
			{/* Header */}
			<header className="bg-white shadow-lg rounded-lg p-6 mb-4 flex justify-between items-center">
				<h1 className="text-3xl font-semibold text-gray-900">
					Dashboard Overview
				</h1>
				<div className="relative">
					<input
						type="text"
						placeholder="Search..."
						className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<svg
						className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</div>
			</header>

			<main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Card title="Total Users" count="1,234" date="Last 30 days" />
				<Card title="Revenue" count="$56,789" date="This month" />
				<Card title="New Orders" count="456" date="Today" />
				<Card title="Page Views" count="98,765" date="Last 7 days" />
				<Card title="Support Tickets" count="12" date="Open" />
				<Card title="Conversion Rate" count="3.2%" date="Overall" />
			</main>
		</div>
	)
}

export default Dashboard
