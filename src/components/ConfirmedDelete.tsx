import React from 'react'

type ConfirmedDel = {
  alert: string,
  onCancel: ()=>void
}

const ConfirmedDelete: React.FC<ConfirmedDel> = ({alert, onCancel}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">{alert}</p>
            <div className="flex justify-center space-x-4">
                
                <button onClick={onCancel}  className="px-6 py-2 bg-red-300 text-white-800 rounded-md hover:bg-red-400 transition duration-300">ok</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmedDelete