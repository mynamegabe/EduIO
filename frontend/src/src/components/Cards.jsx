import React from "react"
import { useState, useEffect } from "react"
import { Card, CardBody, CardFooter, Button, ButtonGroup } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

function FlashCard({flashcards}) {
    const [flip, setFlip] = useState(false)
    const [activeQuestion, setActiveQuestion] = useState(0)

    const triggerFlip = () => setFlip(!flip)

    const nextQuestion = () => {
        setActiveQuestion(activeQuestion + 1)
    }

    const prevQuestion = () => {
        setActiveQuestion(activeQuestion - 1)
    }

    return (
        <div className="flex flex-col justify-center items-center mt-4 gap-4 w-full">
        <Card isPressable onPress={triggerFlip} 
        className="bg-[var(--bg-compliment)]"
        style={{
            minHeight: "300px",
            width: "100%"
        }}>
            <CardBody className={`${flip? "": "font-bold text-2xl"} items-center justify-center text-white hover:bg-[var(--bg-compliment)]`}>
                {flip? flashcards[activeQuestion]?.answer : flashcards[activeQuestion]?.question}
            </CardBody>
        </Card>  
        <ButtonGroup>
            <Button 
            className="bg-[#4A4E69] text-white"
            onClick={prevQuestion} 
            isDisabled={activeQuestion==0?true:false}>
                &lt;
            </Button>
            <Button 
            className="bg-[#4A4E69] text-white"
            onClick={nextQuestion} 
            isDisabled={activeQuestion==(flashcards.length-1)?true:false}>
                &gt;
            </Button>
        </ButtonGroup>
        </div>
    )
}

function MCQCard({mcq}) {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [correct, setCorrect] = useState(false)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const nextQuestion = () => {
        setActiveQuestion(activeQuestion + 1)
    }

    const prevQuestion = () => {
        setActiveQuestion(activeQuestion - 1)
    }

    const checkAnswer = (answer) => {
        console.log(answer, mcq[activeQuestion].answer)
        if (answer == mcq[activeQuestion].answer) {
            setCorrect(true)
        } else {
            setCorrect(false)
        }
        onOpen()
        return answer == mcq[activeQuestion].answer
    }

    return (
        <>
        <div className="flex flex-col justify-center items-center mt-4 gap-4 w-full">
            <Card 
            className="bg-[var(--bg-compliment)]"
            style={{
                minHeight: "300px",
                width: "100%"
            }}>
                <CardBody className="justify-center items-center text-white font-bold text-2xl">{mcq[activeQuestion].question}</CardBody>
                <CardFooter className="justify-center items-center gap-4">
                    <div className="flex flex-wrap gap-4 break-words w-full relative">
                        <Button
                        className="bg-white"
                        style={{
                            width: "calc(50% - 5px)",
                            whiteSpace: "break-spaces",
                            minHeight: "50px",
                            height: "fit-content",
                            flexGrow: "1",
                        }}
                        onClick={() => checkAnswer(1)}>
                            {mcq[activeQuestion].options[0]}
                        </Button>
                        <Button
                        className="bg-white"
                        style={{
                            width: "calc(50% - 5px)",
                            whiteSpace: "break-spaces",
                            minHeight: "50px",
                            height: "fit-content",
                            flexGrow: "1",
                        }} 
                        onClick={() => checkAnswer(2)}>
                            {mcq[activeQuestion].options[1]}
                        </Button>
                        <Button
                        className="bg-white"
                        style={{
                            width: "calc(50% - 5px)",
                            whiteSpace: "break-spaces",
                            minHeight: "50px",
                            height: "fit-content",
                            flexGrow: "1",
                        }}
                        onClick={() => checkAnswer(3)}>
                            {mcq[activeQuestion]?.options[2]}
                        </Button>
                        <Button
                        className="bg-white"
                        style={{
                            width: "calc(50% - 5px)",
                            whiteSpace: "break-spaces",
                            minHeight: "50px",
                            height: "fit-content",
                            flexGrow: "1",
                        }} 
                        onClick={() => checkAnswer(4)}>
                            {mcq[activeQuestion]?.options[3]}
                        </Button>
                    </div>
                </CardFooter>
            </Card>  
            <ButtonGroup>
            <Button 
            className="bg-[#4A4E69] text-white"
            onClick={prevQuestion} isDisabled={activeQuestion==0?true:false}>&lt;</Button>
            <Button 
            className="bg-[#4A4E69] text-white"
            onClick={nextQuestion} isDisabled={activeQuestion==(mcq.length-1)?true:false}>&gt;</Button>
            </ButtonGroup>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}
        className="bg-white"
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">{correct? "Correct!": "Incorrect!"}</ModalHeader>
                <ModalBody>
                    <p>
                        {correct? "You selected the correct answer. Good job!": "You selected the wrong answer. Try again!"}
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
        </>
    )
}

function SummaryCard({summary, query}) {
    return (
        <Card className="mt-2 bg-[var(--bg-compliment)] p-4"
        style={{
            minHeight: "300px"
        }}>
            <p className="text-white">{summary}</p>
        </Card>
    )
}

export {FlashCard, MCQCard, SummaryCard}