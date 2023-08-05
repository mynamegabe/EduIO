import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import {Tabs, Tab, Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { NavBar } from "../../components/navbar.jsx";
import { useParams } from "react-router-dom";
import { url } from "../../api.jsx"
import { FlashCard, MCQCard, SummaryCard } from "../../components/Cards.jsx"

function Content() {
    // /content/:id/mcq
    // quiz_json, summary
    const [mcq, setMCQ] = useState([])
    const [flashcards, setFlashcards] = useState([])
    const [summary, setSummary] = useState("")
    // const [flip, setFlip] = useState(false)

    // const triggerFlip = () => setFlip(!flip)

    const params = useParams()
    const id = params.id
    const getContent = () => {
        axios.get(`${url}/content/${id}`).then((response) => {
            setMCQ(JSON.parse(response.data.mcq_json))
            setSummary(response.data.summary)
            setFlashcards(JSON.parse(response.data.quiz_json))
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
                height: "calc(100vh - 64px)",
                padding: "50px 0px"
            }}>
            <div className="flex w-3/5 flex-col">
                <Tabs aria-label="Options" classNames={{
                tabList: " w-full relative",
                cursor: "w-full bg-[#C9ADA7]",
                tab: "h-12",
                tabContent: "group-data-[selected=true]:text-[#ffffff]"
                }}>
                    <Tab key="summary" title="Summary">
                    <SummaryCard summary={summary}/>
                    </Tab>
                    <Tab key="flashcards" title="Flashcards">
                    <FlashCard flashcards={flashcards} />
                    </Tab>
                    <Tab key="mcq" title="MCQ">
                        <MCQCard mcq={mcq} />
                    </Tab>
                </Tabs>
                </div>  
            </div>
        </main>
    )
}

export default Content