import './index.css'

import QuizContext from '../../context/QuizContext'
import Header from '../Header'

const Report = () => (
  <QuizContext.Consumer>
    {value => {
      const {score, unAttemptedList} = value

      return (
        <>
          <Header />
          <div className="report-container">
            <div className="middle-container">
              <div className="quiz-details">
                <div className="score-details">
                  <p className="report-score">{score}</p>
                  <p className="total-score">/10</p>
                </div>
                <div className="details-container">
                  <div className="img-details">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                      alt="correct answer icon"
                      className="right-icon"
                    />
                    <p className="number">{score} Correct answers</p>
                  </div>
                  <div className="img-details">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                      alt="incorrect answer icon"
                      className="right-icon"
                    />
                    <p className="number">{10 - score} Wrong answers</p>
                  </div>
                  <div className="img-details">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                      alt="unattempted icon"
                      className="right-icon"
                    />
                    <p className="number">
                      {unAttemptedList.length} Unattempted
                    </p>
                  </div>
                </div>
              </div>
              <div className="unattempted-container">
                {unAttemptedList.length === 0 ? (
                  <h1 className="unattempt-heading">
                    Attempted all the questions
                  </h1>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )
    }}
  </QuizContext.Consumer>
)

export default Report
