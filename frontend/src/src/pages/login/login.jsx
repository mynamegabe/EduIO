import React from "react"
import {Input, Button, Link} from "@nextui-org/react"
import {EyeFilledIcon} from "../../icons/EyeFilledIcon.jsx"
import {EyeSlashFilledIcon} from "../../icons/EyeSlashFilledIcon.jsx"
import { useState } from "react"
import axios from "axios"
import {url} from "../../api.jsx"
import { useNavigate } from "react-router-dom"

function Login() {
    const [isVisible, setIsVisible] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("login")
        axios.post(`${url}/login`, {
            "username": username,
            "password": password
        }).then((response) => {
            console.log(response)
            navigate("/search")
        })        
    }

    return (
        <div className="flex flex-col gap-10 items-center">
            <h1 className="text-white text-4xl font-bold">Welcome back!</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4" style={{width:"500px"}}>
                <Input type="text" label="Username" isRequired value={username} onChange={(e) => setUsername(e.target.value)}/>
                <Input type={isVisible ? "text" : "password"} label="Password" isRequired value={password} onChange={(e) => setPassword(e.target.value)} endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                } />
                <Button type="submit" className="w-full bg-[--primary]">Login</Button>
            </form>
            <p className="text-white">Don't have an account? <Link href="/register" className="text-[--primary]">Register</Link></p>
        </div>
    )
}

export default Login