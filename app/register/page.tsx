"use client"

import React, { useState, FormEvent, ChangeEvent } from "react"
import { useRouter } from "next/navigation"

const initState = {
    username: "",
    password: ""
}

export default function Feedback() {
    const [data, setData] = useState(initState)
    const [role, setRole] = useState('user')

    const router = useRouter()

    const clickLogin = () => {
        router.push(`/login/`)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(JSON.stringify(data))
        const { username, password } = data

        // Send data to API route
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password, role
            })
        })

        const result = await res.json()
        console.log(result)

        // Navigate to thank you
        router.push(`/login/`)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const name = e.target.name

        setData(prevData => ({
            ...prevData,
            [name]: e.target.value
        }))
    }

    const canSave = [...Object.values(data)].every(Boolean)

    const content = (
        <div className="container py-10 px-10 mx-auto max-w-full flex flex-col items-center">
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl p-6">

            <h1 className="text-4xl mb-4">Register</h1>

            <label className="text-2xl mb-1" htmlFor="name">Username:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="username"
                name="username"
                placeholder="Jane"
                // pattern="([A-Z])[\w+.]{1,}"
                value={data.username}
                onChange={handleChange}
                autoFocus
            />

            <label className="text-2xl mb-1" htmlFor="email">Password:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                value={data.password}
                onChange={handleChange}
            />
            <label className="text-2xl mb-1" htmlFor="email">Role:</label>
            <select
                id="role"
                name="role"
                value={role}
                onChange={e => setRole(e.target.value)}
            >
                <option value="admin">Admin</option>
                <option value="accountant">Accountant</option>
                <option value="user">User</option>

            </select>


            <button
                className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-xs bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden"
                disabled={!canSave}
            >Submit</button>

        </form>
            <button
                className="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded"
                onClick={clickLogin}
            >Already registered? Login</button>
        </div>

    )

    return content
}