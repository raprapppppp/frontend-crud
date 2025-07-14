import React from 'react'

type AlertBoxSuccessT = {
  message: string; // The success message to display
  onClose: () => void; // Function to call when the OK button is clicked
}

const AlertSuccessful: React.FC<AlertBoxSuccessT> = ({message, onClose}) => {
  return (
     <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Alert dialog box */}
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        {/* Success message text */}
        <p className="text-lg font-semibold text-green-600 mb-4">{message}</p>
        {/* OK button to close the alert */}
        <button
          onClick={onClose}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default AlertSuccessful
