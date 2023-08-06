import React from "react"
import {Input, Button, Link} from "@nextui-org/react"
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { SearchIcon } from "../../components/SearchIcon.jsx"
import { EyeIcon } from "../../components/EyeIcon.jsx"
import { CancelIcon } from "../../components/CancelIcon.jsx"
import { CardIcon } from "../../components/CardIcon.jsx"
import { NavBar } from "../../components/Navbar.jsx";
import { CameraIcon } from "../../components/CameraIcon.jsx"
import NumberDropdown from "../../components/Dropdown.jsx"
import { useState, useEffect } from "react"
import axios from "axios"
import {url} from "../../api.jsx"
import { useNavigate } from "react-router-dom"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";


function Search() {
    const [isVisible, setIsVisible] = useState(false)
    const [historyData, setHistoryData] = useState([])
    const [query, setQuery] = useState("")
    const [num, setNum] = useState(0)
    const [numQuestions, setNumQuestions] = useState(10)

    const items = [
        {
        key: "10",
        label: "10",
        },
        {
        key: "20",
        label: "20",
        },
        {
        key: "30",
        label: "30",
        }
    ];
        
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
        axios.post(`${url}/generate`, 
        {
            "query": query,
            "num_questions": numQuestions
        }, 
        {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response)
            onOpen()
        })        
    }

    const uploadFile = (event) => {
        // setImage( event.target.files[0])
        console.log(event.target.files[0])
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append("query", image.name ? "IMG" : query)
        formData.append("num_questions", numQuestions)
        formData.append("text_image", image, image.name)
        console.log(formData.get("query"))
        axios.post(`${url}/generate`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
        }).then((response) => {
            console.log(response)
            onOpen()
        })    
    }


    return (
        <main>
            <NavBar />
            <div className="flex flex-col justify-center gap-10 items-center" style={{
                minHeight: "calc(100vh - 64px)",
            }}>
                {/* <h1 className="text-white text-4xl font-bold">Welcome back!</h1> */}
                {/* <img src="/cloudhacks_logo.png" className="w-20" /> */}
                <form onSubmit={handleSearch} 
                className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4"
                style={{
                    maxWidth:"800px",
                    width: "80vw",
                }}
                >
                    <Input
                        label={
                            <div className="flex flex-row space-x-96 w-full justify-between">
                                <p>Search</p>
                                <div className="flex flex-row gap-2">
                                    <p>Filter number of questions:</p>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button 
                                            variant="bordered"
                                            className="h-[20px] w-[10px]" 
                                            >
                                            {numQuestions}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Dynamic Actions" className="bg-[#4A4E69] rounded-lg text-white" items={items} onAction={(key) => setNumQuestions(key)}>
                                            {(item) => (
                                            <DropdownItem
                                                key={item.key}
                                                // color={item.key === "delete" ? "danger" : "default"}
                                                // className={item.key === "delete" ? "text-danger" : ""}
                                            >
                                                {item.label}
                                            </DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        }
                        // isClearable
                        radius="lg"
                        classNames={{
                        label: "text-black/50 w-full dark:text-white/90 mb-2",
                        input: [
                            // "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        // innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "h-20",
                            // "shadow-xl",
                            "bg-white",
                            // "backdrop-blur-xl",
                            // "backdrop-saturate-200",
                            "hover:bg-white",
                            "group-data-[focused=true]:bg-white",
                            "!cursor-text",
                        ],
                        }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        // isClearable={true}
                        placeholder="Type to search..."
                        description="Search a keyword, topic or URL to get started."
                        startContent={
                        <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                        }
                        endContent={
                            query == "" ?
                            // <CameraIcon><input type="file" onChange={uploadFile} /></CameraIcon>
                            <div className="hoverFade" style={{
                                height: "24px",
                                width: "24px",
                                position: "relative",
                                cursor: "pointer",
                            }}>
                                <CameraIcon />
                                <input type="file" onChange={uploadFile} className="absolute relative w-full h-full opacity-0 cursor-pointer" style={{
                                    top: "0",
                                    left: "0",
                                    zIndex: "2",
                                    height: "24px",
                                    width: "24px",
                                    position: "absolute",
                                    cursor: "pointer",
                                }} />
                            </div>
                            // <button className="focus:outline-none" type="button" onClick={uploadFile}>
                            //   <CameraIcon />
                            // </button> 
                            : 
                            <button className="focus:outline-none" type="button" onClick={() => setQuery("")}>
                                <CancelIcon />
                            </button>
                          }
                        // isClearable={query== "" ? false : true}
                    />
                </form>
                
                <div className="flex flex-wrap gap-6 items-start mb-40" 
                style={{
                    maxWidth:"800px",
                    width: "80vw",
                }}>
                    {historyData.map((item) => (
                        <Card className="py-2 bg-white" shadow="sm">
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}
            className="bg-white"
            >
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
        </main>
    )
}

export default Search