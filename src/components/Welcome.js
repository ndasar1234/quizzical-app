import React from "react";

export default function Welcome(props) {

    return (
        // header
        <div className="welcome-page">
            <h1 className="welcome-page-title">Quizzical</h1>
            <p className="welcome-page-description">Some description if needed</p>

            <form className="welcome-page-options">

                {/* getting num of questions */}
                <div className="welcome-page-option">
                    <label htmlFor='numQuestions' ># of Questions: </label>
                    <input
                        required
                        type="number"
                        id="numQuestions"
                        name="numQuestions"
                        value={props.formData.numQuestions}
                        onChange={props.handleChange}
                    />
                </div>

                {/* getting question category */}
                <div className="welcome-page-option">
                    <label htmlFor="category">Category: </label>
                    <select
                        id="category"
                        name="category"
                        value={props.formData.category}
                        onChange={props.handleChange}
                    >
                        <option value="">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals & Theatres</option>
                        <option value="14">Entertainment: Telivision</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Anime & Manga</option>
                        <option value="32">Entertainment: Cartoon & Animations</option>
                    </select>
                </div>

                {/* getting question difficulty */}
                <div className="welcome-page-option">
                    <label htmlFor="difficulty">Difficulty: </label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={props.formData.difficulty}
                        onChange={props.handleChange}
                    >
                        <option value="">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                {/* getting question type (mc or t/f) */}
                <div className="welcome-page-option">
                    <label htmlFor="questionType">Type of questions: </label>
                    <select
                        id="questionType"
                        name="questionType"
                        value={props.formData.questionType}
                        onChange={props.handleChange}
                    >
                        <option value="">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select>
                </div>

                <button type="button" className="btn welcome-page-start-quiz-btn" onClick={props.startQuiz}>Start quiz</button>
                {/* note: button is type button to prevent default behavior of
                submitting the form */}
            </form>
        </div>
    )

}