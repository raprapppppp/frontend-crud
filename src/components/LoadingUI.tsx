import React from "react"

const LoadingUI = () => {
	return (
		<div className="container mx-auto p-4">
			<div className="animate-pulse">
				<div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

				<div className="animate-pulse">
					<div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
				</div>

				<div className="animate-pulse">
					<div className="w-full h-64 bg-gray-300 rounded mb-6"></div>
				</div>

				<div className="animate-pulse space-y-2">
					<div className="h-4 bg-gray-300 rounded w-full"></div>
					<div className="h-4 bg-gray-300 rounded w-5/6"></div>
					<div className="h-4 bg-gray-300 rounded w-4/6"></div>
				</div>

				<div className="mt-6 animate-pulse space-y-3">
					<div className="h-4 bg-gray-300 rounded w-1/2"></div>
					<div className="h-4 bg-gray-300 rounded w-3/4"></div>
					<div className="h-4 bg-gray-300 rounded w-2/3"></div>
					<div className="h-4 bg-gray-300 rounded w-5/6"></div>
				</div>

				<div className="mt-8 space-y-4">
					<div className="animate-pulse flex space-x-4">
						<div className="h-10 w-10 bg-gray-300 rounded-full"></div>
						<div className="h-10 w-10 bg-gray-300 rounded-full"></div>
						<div className="h-10 w-10 bg-gray-300 rounded-full"></div>
						<div className="h-10 w-10 bg-gray-300 rounded-full"></div>
					</div>

					<div className="animate-pulse flex space-x-4">
						<div className="h-10 w-16 bg-gray-300 rounded"></div>
						<div className="h-10 w-16 bg-gray-300 rounded"></div>
						<div className="h-10 w-16 bg-gray-300 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoadingUI
