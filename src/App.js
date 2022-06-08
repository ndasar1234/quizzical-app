import React from "react";
import Welcome from "./components/Welcome"
import Quiz from "./components/Quiz"

export default function App() {

  const [startQuiz, setStartQuiz] = React.useState(false)

  function beginQuiz() {
    setStartQuiz(prev => !prev)
  }


  // state used by <Quiz /> and <Welcome />
  const [formData, setFormData] = React.useState({
    numQuestions: "",  // number
    category: "",  // drop down box
    difficulty: "",  // drop down box
    questionType: ""  // drop down box
  })

  // used to manipulate state above in <Welcome />
  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }



  return (
    <main>
      <div className="content">
        {
          startQuiz ?
            <div>
              <Quiz formData={formData} startQuiz={beginQuiz} />
            </div>
            :
            <Welcome startQuiz={beginQuiz} formData={formData} handleChange={handleChange} />
        }
      </div>
      <div className="left-blob"></div>
      <div className="right-blob"></div>
    </main>


  )
}
