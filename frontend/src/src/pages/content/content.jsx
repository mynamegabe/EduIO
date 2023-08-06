import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import {Tabs, Tab, Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { NavBar } from "../../components/Navbar.jsx";
import { useParams } from "react-router-dom";
import { url } from "../../api.jsx"
import { FlashCard, MCQCard, SummaryCard, FillBlanksCard } from "../../components/Cards.jsx"

function Content() {
    // /content/:id/mcq
    // quiz_json, summary
    const [mcq, setMCQ] = useState([])
    const [flashcards, setFlashcards] = useState([])
    const [blanks, setBlanks] = useState([])
    const [summary, setSummary] = useState("")
    const [query, setQuery] = useState("")
    const [refURL, setRefURL] = useState("")
    // const [flip, setFlip] = useState(false)

    // const triggerFlip = () => setFlip(!flip)

    const params = useParams()
    const id = params.id
    const getContent = () => {
        axios.get(`${url}/content/${id}`).then((response) => {
            setMCQ(JSON.parse(response.data.mcq_json))
            setSummary(response.data.summary)
            setFlashcards(JSON.parse(response.data.quiz_json))
            setBlanks(JSON.parse(response.data.fill_the_blank_json))
            setQuery(response.data.query)
            setRefURL(response.data.url)
        })
        // setFlashcards(fake_flashcards)
        // setMCQ(fake_mcq)
        // setSummary(fake_summary)
    }

    useEffect(() => {
        getContent()
    }, [])


    return (
        <main>
            <NavBar />
            <div className="flex justify-center h-full w-full" style={{
                minHeight: "calc(100vh - 64px)",
            }}>
            <div className="flex w-3/5 max-[1400px]:w-4/5 flex-col mt-10">
                <div className="flex w-full relative mb-10">
                    <h1 className="text-4xl font-bold text-white">{query}</h1>
                    <h3 className="text-4xl font-bold text-white">{refURL}</h3>
                </div>
                <Tabs aria-label="Options" classNames={{
                tabList: " w-full relative",
                cursor: "w-full bg-[var(--bg-compliment)]",
                tab: "h-12 hover:[&>div]:text-[#000000]",
                tabContent: "group-data-[selected=true]:text-[#ffffff] group-data-[selected=true]:font-bold text-black"
                }}>
                    <Tab key="summary" title="Summary">
                        <SummaryCard summary={summary} query={query}/>
                    </Tab>
                    <Tab key="flashcards" title="Flashcards">
                        <FlashCard flashcards={flashcards} />
                    </Tab>
                    <Tab key="mcq" title="MCQ">
                        <MCQCard mcq={mcq} />
                    </Tab>
                    <Tab key="fill_blanks" title="Fill in the Blanks">
                        <FillBlanksCard blanks={blanks}/>
                    </Tab>
                </Tabs>
                </div>  
            </div>
        </main>
    )
}

export default Content