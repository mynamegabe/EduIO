import React from "react"
import { useState } from "react"
import {Input, Button, Link} from "@nextui-org/react"
import {EyeFilledIcon} from "../../icons/EyeFilledIcon.jsx"
import {EyeSlashFilledIcon} from "../../icons/EyeSlashFilledIcon.jsx"
import axios from "axios"
import {url} from "../../api.jsx"
import { useNavigate } from "react-router-dom"

function Register() {
    const [isVisible, setIsVisible] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const toggleVisibility = () => setIsVisible(!isVisible)
    
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("register")
        axios.post(`${url}/register`, {
            "username": username,
            "email": email,
            "password": password
        }).then((response) => {
            console.log(response)
            navigate("/login")
        })
    }

    return (
        <div className="flex flex-col gap-10 items-center">
            <h1 className="text-white text-4xl font-bold">Register for an account</h1>
            <form onSubmit={handleSubmit} className="flex flex-col flex-wrap md:flex-nowrap gap-4" style={{width:"500px"}}>
                <Input type="text" label="Username" isRequired value={username} onChange={(e) => setUsername(e.target.value)}/>
                <Input type="email" label="Email" isRequired value={email} onChange={(e) => setEmail(e.target.value)}/> 
                <Input type={isVisible ? "text" : "password"} label="Password" isRequired value={password} onChange={(e) => setPassword(e.target.value)} endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                        </button>
                    } />
                <Button type="submit" className="w-full bg-[--primary]">Register</Button>
            </form>
            <p className="text-white">Already have an account? <Link href="/login" className="text-[--primary]">Login</Link></p>
        </div>
    )
}

export default Register