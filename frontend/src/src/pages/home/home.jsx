import React from 'react'

import { Button, Link } from "@nextui-org/react"

function Home() {
    return (
        <main>
        <div className="flex flex-row w-full h-full items-center">
            <div className="flex flex-col w-3/5 h-full bg-[color:var(--primary)] justify-center items-center gap-4">
                <p>ARBITRARY QUESTION</p>
            </div>
            <div className="flex flex-col w-2/5 h-full items-center justify-center gap-4 p-10 flex-wrap">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <h1 className="text-white text-4xl font-bold">Ready to learn?</h1>
                    <div className="flex flex-row gap-4 justify-center">
                    <Link href="/login"><Button className="bg-[#4A4E69]" style={{minWidth: "200px", width: "100%"}}>Login</Button></Link>
                    <Link href="/register"><Button className="bg-[#C9ADA7]" style={{minWidth: "200px"}}>Register</Button></Link>
                    </div>
                </div>
                <p className="text-white text-center">POWERED BY <br />CHATGPT</p>
            </div>
        </div>
        </main>
    )
}

export default Home