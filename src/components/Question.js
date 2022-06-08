import React from "react";
import he from "he"  // needed because certain characters return weird vals (& = &amp:)


export default function Question(props) {

    const answerChoiceElements = props.answerChoices.map(answer => {

        // changing the background color based on if the button is clicked and correct/incorrect
        let styles = {
            backgroundColor: answer.isClicked ? "#D6DBF5" : "#F5F7FB"
        }
        if (props.showAnswers) {
            if (answer.isClicked && answer.isCorrect) {
                styles = {
                    backgroundColor: "#94D7A2"
                }
            }
            else if (answer.isClicked && !answer.isCorrect) {
                styles = {
                    backgroundColor: "#F8BCBC",
                    opacity: "50%",
                }
            }
            else if (answer.isCorrect) {
                styles = {
                    backgroundColor: "#94D7A2",
                    opacity: "50%"
                }
            }
        }

        // creating all the answer choice buttons
        return (
            <button
                key={answer.id}
                onClick={() => props.updateClicked(props.questionID, answer.id)}
                className="btn answer-btn"
                style={styles}
            >
                {he.decode(answer.value)}
            </button>
        )
    })

    return (
        <div className="question">
            <h3 className="question-prompt">{he.decode(props.question)}</h3>
            <div className="question-choices">
                {answerChoiceElements}
            </div>
        </div>
    )

}