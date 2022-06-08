import React from "react";
import { nanoid } from "nanoid";
import Question from "./Question"


export default function Quiz(props) {

    const [quizData, setQuizData] = React.useState([])
    const [showAnswers, setShowAnswers] = React.useState(false)
    const { numQuestions, questionType, category, difficulty } = props.formData

    React.useEffect(() => {
        // calling api based on given requirements
        fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${questionType}`)
            .then(res => res.json())
            .then(data => setQuizData(() => {
                return data.results.map(question => {
                    // turning all the answers into objects with the necessary properties
                    const answerChoices = question.incorrect_answers.map(answer => ({
                        value: answer,
                        id: nanoid(),
                        isClicked: false,
                        isCorrect: false
                    }))
                    // setting the correct answer to an object with isCorrect = true
                    const correctAnswer = {
                        value: question.correct_answer,
                        id: nanoid(),
                        isClicked: false,
                        isCorrect: true
                    }
                    // pushing correctAnswer
                    // T/F: if the right answer is true, insert at the front otherwise the back
                    if (question.type === "boolean") {
                        if (correctAnswer.value === "True") {
                            answerChoices.unshift(correctAnswer)
                        }
                        else {
                            answerChoices.push(correctAnswer)
                        }
                    }
                    // multiple choice: pushing answer to the end and shuffling array
                    else if (question.type === "multiple") {
                        answerChoices.push(correctAnswer)
                        answerChoices.sort(() => (Math.random() > .5) ? 1 : -1)
                    }

                    // returning the properties needed for the question logic
                    return {
                        question: question.question,
                        type: question.type,
                        answerChoices: answerChoices,
                        id: nanoid()
                    }
                })
            }))
    }, [category, difficulty, numQuestions, questionType])


    // function to change the state of isClicked, done in Quiz instead of Question so as not
    // to have conflicting states/multiple instances of the truth
    function updateClicked(questionID, answerID) {
        if (showAnswers) {
            return
        }
        setQuizData(prevQuizData => {
            return prevQuizData.map(question => {
                if (questionID === question.id) {
                    const newAnswers = question.answerChoices.map(answer => {
                        if (answerID === answer.id) {
                            return {
                                ...answer,
                                isClicked: !answer.isClicked
                            }
                        }
                        else {
                            return {
                                ...answer,
                                isClicked: false
                            }
                        }
                    })
                    return {
                        ...question,
                        answerChoices: newAnswers
                    }
                }
                else {
                    return question
                }
            })
        })
    }

    function reset() {
        setShowAnswers(false)
        props.startQuiz()
    }

    // calculating score when submitting the quiz
    let score = 0
    if (showAnswers) {
        quizData.forEach(question => {
            question.answerChoices.forEach(answer => {
                if (answer.isClicked && answer.isCorrect) {
                    score++
                }
            })
        })
    }


    const questionElements = quizData.map(question => {
        return (

            <Question
                key={question.id}
                question={question.question}
                answerChoices={question.answerChoices}
                updateClicked={updateClicked}
                questionID={question.id}
                showAnswers={showAnswers}
            />
        )
    })

    return (
        <div className="quiz-questions">
            {questionElements}
            {
                showAnswers ?
                    <div className="quiz-summary">
                        <p className="quiz-score">You scored {score}/{numQuestions} correct answers</p>
                        <button className="btn quiz-play-again" onClick={reset}>Play again</button>
                    </div>
                    :
                    <div className="quiz-check">
                        <button className="btn quiz-check-answers" onClick={() => setShowAnswers(true)}>Check answers</button>
                    </div>
            }
        </div>
    )




}