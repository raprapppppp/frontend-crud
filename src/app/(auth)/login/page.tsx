'use client'

import React, { useState } from 'react'
import Logo from '../../../../public/card-mri.png'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Info = {
    username: string,
    password: string
}
const Login = () => {

    const router = useRouter()
    const [loginCredentials, setLoginCredentials] = useState<Info> ({
        username: "",
        password: ""
    })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

       if(loginCredentials.username === "" || loginCredentials.password === ""){
        console.log("Fill out the details")
        setLoginCredentials({
            username: "",
            password: "",
       })
       }
            try{
                const response = await fetch("http://localhost:3001/account/login", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include",
                    body: JSON.stringify(loginCredentials)
                })
                const token = await response.json()
                console.log(response)
                if(response.ok){
                    router.push('/dashboard')
                    localStorage.setItem("token", token.token)
                    setLoginCredentials({
                            username: "",
                            password: "",
                    })
                }   
            }catch(err){
                console.log(err)
            }
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target

        setLoginCredentials((prevData) => {
            return {...prevData, [name]: value}
        })
    }


  return (
    <div className="flex justify-center items-center h-screen">
    
        <div className="w-1/2 h-screen bg-green-700 flex justify-center items-center ">
            <Image src={Logo} alt='Logo' />
            
        </div>

        <div className= "lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 bg-gray-200 h-screen">
            <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
            <form onSubmit={handleLogin}>
      
            <div className="mb-4  ">
                <label className="block text-gray-600">Username</label>
                <input onChange={handleChangeInput} value={loginCredentials.username} type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
            </div>
    
            <div className="mb-4">
                <label className="block text-gray-800">Password</label>
                <input onChange={handleChangeInput} value={loginCredentials.password} type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
            </div>
            
            <div className="mb-4 flex items-center">
                <input type="checkbox" id="remember" name="remember" className="text-red-500" />
                <label className="text-green-900 ml-2">Remember Me</label>
            </div>
      
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
             </form>
    
        <div className="mt-6 text-green-500 text-center">
        <Link href='/register' className="hover:underline">Sign up Here</Link>
        </div>
        </div>
    </div>
  )
}

export default Login