"use client"
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

			{/* Dashboard Cards */}
			<main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{/* Card 1 */}
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-xl font-bold text-gray-800 mb-2">Total Users</h2>
					<p className="text-4xl font-extrabold text-blue-600">1,234</p>
					<p className="text-gray-500 mt-2">Last 30 days</p>
				</div>

				{/* Card 2 */}
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-xl font-bold text-gray-800 mb-2">Revenue</h2>
					<p className="text-4xl font-extrabold text-green-600">$56,789</p>
					<p className="text-gray-500 mt-2">This month</p>
				</div>

				{/* Card 3 */}
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-xl font-bold text-gray-800 mb-2">New Orders</h2>
					<p className="text-4xl font-extrabold text-purple-600">456</p>
					<p className="text-gray-500 mt-2">Today</p>
				</div>

				{/* Card 4 */}
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-xl font-bold text-gray-800 mb-2">Page Views</h2>
					<p className="text-4xl font-extrabold text-yellow-600">98,765</p>
					<p className="text-gray-500 mt-2">Last 7 days</p>
				</div>

				{/* Card 5 */}
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-xl font-bold text-gray-800 mb-2">
						Support Tickets
					</h2>
					<p className="text-4xl font-extrabold text-red-600">12</p>
					<p className="text-gray-500 mt-2">Open</p>
				</div>

				{/* Card 6 */}
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-xl font-bold text-gray-800 mb-2">
						Conversion Rate
					</h2>
					<p className="text-4xl font-extrabold text-teal-600">3.2%</p>
					<p className="text-gray-500 mt-2">Overall</p>
				</div>
			</main>
		</div>
	)
}

export default Dashboard
