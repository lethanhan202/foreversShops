import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success === true) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>
                    Admin Panel
                    <form onSubmit={onSubmitHandler}>
                        <div className='min-w-72 mb-3'>
                            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                            <input onChange={(e) => setEmail(e.target.value)}
                                className='rounded-md text-sm w-full px-3 py-2 border
                             border-gray-300 outline-none'
                                type="email" placeholder='Enter your email' required />
                        </div>
                        <div className='min-w-72 mb-3'>
                            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                            <input onChange={(e) => setPassword(e.target.value)}
                                className='rounded-md text-sm w-full px-3 py-2 border
                             border-gray-300 outline-none'
                                type="password" placeholder='Enter password' required />
                        </div>
                        <button type='submit'
                            className='mt-2 w-full py-2 px-4 rounded-md font-medium bg-black text-white'>
                            Login
                        </button>
                    </form>
                </h1>
            </div>
        </div>
    )
}

export default Login
