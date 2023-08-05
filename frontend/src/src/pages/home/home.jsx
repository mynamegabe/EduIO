import React from 'react'

import { Button, Link } from "@nextui-org/react"

function Home() {
    return (
        <main>
        <div className="flex flex-row w-full h-[100vh] items-center p-[0]">
            <div className="flex flex-col w-3/5 h-full bg-[color:var(--blue)] justify-center items-center gap-4">
                <div className="flex flex-row items-center absolute top-0 left-0 p-[20px]">
                    <img src="/cloudhacks_logo.png" className="w-10 mr-2" />
                    <p className="font-bold text-inherit">EduAI</p>
                </div>
                <p className="w-3/4 text-[25px] leading-relaxed text-[var(--purple)] font-bold">Welcome to our all-in-one learning hub, <br /> where knowledge meets convenience. <br /> Let the journey towards knowledge and success begin!</p>
            </div>
            <div className="flex flex-col w-2/5 h-full items-center justify-center gap-4 p-10 flex-wrap">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <h1 className="text-white text-4xl font-bold mb-4">Ready to learn?</h1>
                    <div className="flex flex-row gap-4 justify-center">
                    <Link href="/login"><Button className="bg-[var(--bg-compliment2)] text-white" style={{minWidth: "200px", width: "100%"}}>Login</Button></Link>
                    <Link href="/register"><Button className="bg-[var(--bg-compliment)] text-white" style={{minWidth: "200px"}}>Register</Button></Link>
                    </div>
                </div>
                <div className="flex flex-col absolute bottom-0 p-[20px] justify-center items-center">
                <div className="flex flex-row items-center">
                    <img src="/cloudhacks_logo.png" className="w-10 mr-2" />
                    <p className="font-bold text-inherit text-white">EduAI</p>
                </div>
                </div>
            </div>
        </div>
        </main>
    )
}

export default Home