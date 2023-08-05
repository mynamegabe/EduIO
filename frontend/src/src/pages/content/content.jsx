import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import {Tabs, Tab, Card, CardBody, CardFooter} from "@nextui-org/react";
import { NavBar } from "../../components/navbar.jsx";
import { useParams } from "react-router-dom";
import { url } from "../../api.jsx"


function Content() {
    // /content/:id/mcq
    // quiz_json, summary
    const [mcq, setMCQ] = useState([])
    const [flashcards, setFlashcards] = useState([])
    const [summary, setSummary] = useState()
    const [flip, setFlip] = useState(false)

    const triggerFlip = () => setFlip(!flip)

    const params = useParams()
    const id = params.id
    const getContent = () => {
        axios.get(`${url}/content/${id}`).then((response) => {
            // JSON.parse(response.data)
            // console.log(JSON.parse(response.data))
            setMCQ(JSON.parse(response.data.mcq_json))
            // console.log(JSON.parse(response.data.quiz_json))
            setSummary(response.data.summary)
            setFlashcards(JSON.parse(response.data.quiz_json))
            // setContent(response.data)
        })
    }

    useEffect(() => {
        getContent()
    }, [])


    return (
        <main>
            <NavBar />
            <div className="flex items-center justify-center h-full w-full" style={{
                height: "calc(100vh - 64px)"
            }}>
            <div className="flex w-1/2 flex-col">
                <Tabs aria-label="Options" classNames={{
                tabList: "gap-6 w-full relative p-0 border-b border-divider",
                cursor: "w-full bg-[#C9ADA7]",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-[C9ADA7]"
                }}>
                    <Tab key="summary" title="Summary">
                    <Card>
                        <CardBody>
                        {summary}
                        </CardBody>
                    </Card>  
                    </Tab>
                    <Tab key="flashcards" title="Flashcards">
                    <Card isPressable onPress={triggerFlip}>
                        <CardBody>
                        {flip? flashcards[0]?.answer : flashcards[0]?.question}
                        </CardBody>
                    </Card>  
                    </Tab>
                    <Tab key="mcq" title="MCQ">
                    <Card>
                        <CardBody>
                        {mcq[0]?.question}
                        </CardBody>
                    </Card>  
                    </Tab>
                </Tabs>
                </div>  
            </div>
        </main>
    )
}

export default Content