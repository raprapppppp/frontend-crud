'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '../../../../public/card-mri.png'

const Register = () => {

    const router = useRouter()
    const [loginCredentials, setLoginCredentials] = useState ({
        username: "",
        password: "",
        })

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
            
            const { name, value } = e.target
    
            setLoginCredentials((prevData) => {
                return {...prevData, [name]: value}
            })
        }
    
    console.log(loginCredentials)

    const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try{
            const response = await fetch("http://localhost:3001/account/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginCredentials)
        })
            const data = await response.json()
            console.log(data)

            if (!response.ok){
                console.log("Username already exist")
            }else{
                router.push('/login')
            }
        }catch (err) {
            console.log(err)
        }

        setLoginCredentials({
            username: "",
            password: ""
        })
    }

    
  return (
    <div className="flex justify-center items-center h-screen">
 
        <div className= "lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 bg-gray-200 h-screen">
            <h1 className="text-2xl font-semibold mb-4">Register Here</h1>
            <form onSubmit={handleSubmitRegister}>
      
            <div className="mb-4  ">
                <label className="block text-gray-800">Username</label>
                <input onChange={handleChangeInput} value={loginCredentials.username} type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
            </div>
    
            <div className="mb-4">
                <label className="block text-gray-800">Password</label>
                <input onChange={handleChangeInput} value={loginCredentials.password} type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
            </div>

            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md py-2 px-4 w-full">Create</button>
             </form>
    
            <div className="mt-6 text-green-500 text-center">
            <Link href='/login' className="hover:underline">Sign in Here</Link>
            </div>  
        </div>

         <div className="w-1/2 h-screen bg-green-700 flex justify-center items-center    ">
            <Image src={Logo} alt='Logo' className=''/>
            
        </div>
    </div>
  )
}

export default Register
