"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Logo from "../../../../public/card-mri.png"
import { useCreateStore } from "./store"
import SuccessMessage from "@/components/SuccessMessage"

const Register = () => {
	const router = useRouter()

	const { iValue, setIvalue, createAcc, message, setMessage } = useCreateStore()

	const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (iValue.username === "" || iValue.password === "") {
			setMessage("Please Fill out the form")
		} else {
			try {
				const res = await createAcc(iValue)
				console.log(res, "Page")

				if (res.error === 406) {
					setMessage("Username already exist")
				} else if (res.message === 200) {
					setMessage("Created Successfully")
					setIvalue({ username: "", password: "" })
					router.push("/login")
				}
			} catch (err) {
				console.log(err)
			}
		}
		setMessage("")
	}
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 bg-gray-200 h-screen">
				<h1 className="text-2xl font-semibold mb-4">Register Here</h1>
				{message === "" ? <></> : <SuccessMessage />}
				<form onSubmit={handleSubmitRegister}>
					<div className="mb-4  ">
						<label htmlFor="username" className="block text-gray-800">
							Username
						</label>
						<input
							onChange={(e) => setIvalue({ username: e.target.value })}
							value={iValue.username}
							type="text"
							className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="password" className="block text-gray-800">
							Password
						</label>
						<input
							onChange={(e) => setIvalue({ password: e.target.value })}
							value={iValue.password}
							type="password"
							className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
						/>
					</div>

					<button
						type="submit"
						className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md py-2 px-4 w-full">
						Create
					</button>
				</form>

				<div className="mt-6 text-green-500 text-center">
					<Link href="/login" className="hover:underline">
						Sign in Here
					</Link>
				</div>
			</div>

			<div className="w-1/2 h-screen bg-green-700 flex justify-center items-center    ">
				<Image src={Logo} alt="Logo" className="" />
			</div>
		</div>
	)
}

export default Register
