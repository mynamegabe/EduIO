import React from "react"
import {Input, Button, Link} from "@nextui-org/react"
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { SearchIcon } from "../../components/SearchIcon.jsx"
import { EyeIcon } from "../../components/EyeIcon.jsx"
import { CardIcon } from "../../components/CardIcon.jsx"
import { useState, useEffect } from "react"
import axios from "axios"
import {url} from "../../api.jsx"
import { useNavigate } from "react-router-dom"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";


function Login() {
    const [isVisible, setIsVisible] = useState(false)
    const [historyData, setHistoryData] = useState([])
    const [query, setQuery] = useState("")
    
    const navigate = useNavigate()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const retrieveHistory = () => {
        axios.get(`${url}/history`).then((response) => {
            console.log(response)
            setHistoryData(response.data)
        })
    }


    useEffect(() => {
        retrieveHistory()
    }, [])

    const handleSearch = (event) => {
        event.preventDefault()
        axios.post(`${url}/generate`, {
            "query": query
        }).then((response) => {
            console.log(response)
            onOpen()
        })        
    }

    return (
        <>
        <div className="flex flex-col gap-10 items-center">
            {/* <h1 className="text-white text-4xl font-bold">Welcome back!</h1> */}
            <img src="/logo.png" className="w-1/6" />
            <form onSubmit={handleSearch} 
            className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4"
            style={{
                maxWidth:"800px",
                width: "80vw",
            }}
            >
                <Input
                    label="Search"
                    isClearable
                    radius="lg"
                    classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        // "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    // innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-xl",
                        "bg-default-200",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "group-data-[focused=true]:bg-default-200/100",
                        "!cursor-text",
                    ],
                    }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type to search..."
                    description="Search a keyword or topic to get started."
                    startContent={
                    <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                />
            </form>
            
            <div className="flex flex-wrap gap-6 items-start" 
            style={{
                maxWidth:"800px",
                width: "80vw",
            }}>
                {historyData.map((item) => (
                    <Card className="py-2" shadow="sm">
                        <CardHeader className="pb-0 pt-0 px-4 flex items-center gap-2">
                            <p className="text-tiny uppercase font-bold">{item.query}</p>
                            <Button color="success" isIconOnly variant="flat"
                            onClick={() => navigate(`/content/${item.id}`)}
                            >
                                <EyeIcon />
                            </Button>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Query Processing</ModalHeader>
                <ModalBody>
                    <p> 
                        Your query is being processed and will take about 30 seconds. Please wait while we generate content for you.
                    </p>
                    <p>
                        Refresh the page in 30 seconds to view your generated content.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                        Continue
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        <Button color="danger" variant="bordered"
        className="fixed top-4 right-4 hover:border-danger-500"
        >
            Logout
        </Button>
        </>
    )
}

export default Login