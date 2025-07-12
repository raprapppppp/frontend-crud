import React from 'react'

type Inputs = {
    type: string,
    name: string,
    value: string | number,
    placeholder: string,
    label: string,
    required: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<Inputs> = ({type,name,value,placeholder,label,required,onChange}) => {
   return (
    <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className="max-w-60 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" />
    </div>
  )
}

export default Input