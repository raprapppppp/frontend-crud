import React from 'react'

const ConfirmedDelete = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">Message Here</p>
            <div className="flex justify-center space-x-4">
                <button  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">Delete</button>
                <button  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300">Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmedDelete