"use client"

import React, { useState } from "react"
import Logo from "../../../../public/card-mri.png"
import Link from "next/link"
import Image from "next/image"

import { useLoginStore } from "./store"
import { useCreateStore } from "../register/store"
import SuccessMessage from "@/components/SuccessMessage"
import { useRouter } from "next/navigation"

const Login = () => {
	const router = useRouter()

	const { account, setAccount, login } = useLoginStore()
	const { message, setMessage } = useCreateStore()

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (account.username === "" || account.password === "") {
		} else {
			try {
				const response = await login(account)
				if (response.error === 404) {
					setMessage("User Does not exist ")
				} else if (response.error === 500) {
					setMessage("Error in Database")
				} else if (response.error === 401) {
					setMessage("Incorrect Password")
				} else if (response.alert === 200) {
					setMessage("Login Successfully")
					setAccount({ username: "", password: "" })
					router.push("/dashboard")
				}
			} catch (err) {
				console.log(err)
			}
		}
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="w-1/2 h-screen bg-green-700 flex justify-center items-center ">
				<Image src={Logo} alt="Logo" />
			</div>

			<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 bg-gray-200 h-screen">
				<h1 className="text-2xl font-semibold mb-4">Sign in</h1>
				{message === "" ? <></> : <SuccessMessage />}
				<form onSubmit={handleLogin}>
					<div className="mb-4  ">
						<label htmlFor="username" className="block text-gray-600">
							Username
						</label>
						<input
							onChange={(e) => setAccount({ username: e.target.value })}
							value={account.username}
							type="text"
							id="username"
							name="username"
							className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="password" className="block text-gray-800">
							Password
						</label>
						<input
							onChange={(e) => setAccount({ password: e.target.value })}
							value={account.password}
							type="password"
							id="password"
							name="password"
							className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
						/>
					</div>

					<div className="mb-4 flex items-center">
						<input
							type="checkbox"
							id="remember"
							name="remember"
							className="text-red-500"
						/>
						<label htmlFor="remember me" className="text-green-900 ml-2">
							Remember Me
						</label>
					</div>

					<button
						type="submit"
						className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md py-2 px-4 w-full">
						Login
					</button>
				</form>

				<div className="mt-6 text-green-500 text-center">
					<Link href="/register" className="hover:underline">
						Sign up Here
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Login
