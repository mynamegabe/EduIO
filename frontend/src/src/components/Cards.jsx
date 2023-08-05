import React from "react"
import { useState, useEffect } from "react"
import { Card, CardBody, CardFooter, Button, ButtonGroup } from "@nextui-org/react";

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
        <div className="flex flex-col justify-center items-center gap-4 w-full">
        <Card isPressable isHoverable onPress={triggerFlip} style={{
            minHeight: "300px",
            width: "100%"
        }}>
            <CardBody className="items-center justify-center">{flip? flashcards[activeQuestion]?.answer : flashcards[activeQuestion]?.question}</CardBody>
        </Card>  
        <ButtonGroup>
            <Button onClick={prevQuestion} isDisabled={activeQuestion==0?true:false}>&lt;</Button>
            <Button onClick={nextQuestion} isDisabled={activeQuestion==(flashcards.length-1)?true:false}>&gt;</Button>
        </ButtonGroup>
        </div>
    )
}

function MCQCard({mcq}) {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [correct, setCorrect] = useState(false)

    const nextQuestion = () => {
        setActiveQuestion(activeQuestion + 1)
    }

    const prevQuestion = () => {
        setActiveQuestion(activeQuestion - 1)
    }

    const checkAnswer = (answer) => {
        console.log(answer == mcq[activeQuestion].answer)
        return answer == mcq[activeQuestion].answer
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
            <Card style={{
                minHeight: "300px",
                width: "100%"
            }}>
                <CardBody className="justify-center items-center">{mcq[activeQuestion].question}</CardBody>
                <CardFooter className="justify-center items-center gap-4">
                    <div className="flex flex-col gap-2 break-words w-1/2">
                        <Button onClick={() => checkAnswer(mcq[activeQuestion].options[0])}>{mcq[activeQuestion].options[0]}</Button>
                        <Button onClick={() => checkAnswer(mcq[activeQuestion].options[1])}>{mcq[activeQuestion].options[1]}</Button>
                    </div>
                    <div className="flex flex-col gap-2 break-words w-1/2">
                        <Button onClick={() => checkAnswer(mcq[activeQuestion].options[2])}>{mcq[activeQuestion]?.options[2]}</Button>
                        <Button onClick={() => checkAnswer(mcq[activeQuestion].options[3])}>{mcq[activeQuestion]?.options[3]}</Button>
                    </div>
                </CardFooter>
            </Card>  
            <ButtonGroup>
            <Button onClick={prevQuestion} isDisabled={activeQuestion==0?true:false}>&lt;</Button>
            <Button onClick={nextQuestion} isDisabled={activeQuestion==(mcq.length-1)?true:false}>&gt;</Button>
            </ButtonGroup>
        </div>
    )
}

function SummaryCard({summary}) {
    return (
        <Card style={{
            minHeight: "300px"
        }}>
            <CardBody className="justify-center items-center">{summary}</CardBody>
        </Card>
    )
}

export {FlashCard, MCQCard, SummaryCard}