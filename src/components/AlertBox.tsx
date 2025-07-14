

type AlertT = {
  error: string
  onClose: ()=>void
}

const AlertBox: React.FC<AlertT> = ({error, onClose}) => {

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">{error}</p>
            <button onClick={onClose} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">OK</button>
        </div>
    </div>
  )
}

export default AlertBox