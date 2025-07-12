import Image from 'next/image'
import React from 'react'
import Logo from '../../public/card-mri.png'
import Background from '../../public/card-bg.png'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
        <header className='mx-auto flex justify-between items-center px-20 pt-5'>
          <div className='max-w-40'>
            <Image src={Logo} alt='Logo' />
          </div>
          <div className='flex gap-5 '>
            <Link href="/login" className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'>Login</Link>
            <Link href="/register" className='bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'>Sign up</Link>
          </div>
        </header>
        <main>
          <div className='bg-cover bg-no-repeat bg-center min-h-screen'>
            <Image src={Background} alt='Logo' className='w-full'/>
          </div>
        </main>
    </div>
  )
}

export default Home