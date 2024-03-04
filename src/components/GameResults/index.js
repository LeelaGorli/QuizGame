import './index.css'
import {Link} from 'react-router-dom'
import QuizContext from '../../context/QuizContext'
import Header from '../Header'

const GameResults = () => (
  <QuizContext.Consumer>
    {value => {
      const {score, unAttemptedList} = value
      console.log(unAttemptedList)
      const renderScoreDetails = () => {
        if (score >= 6) {
          return (
            <div className="success-background">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
                alt="won"
                className="trophy"
              />
              <h1 className="succes-heading">Congrats</h1>
              <p className="succes-para">{score * 10}% Correctly Answered</p>
              <p className="succes-desc">Quiz completed successfully.</p>
              <p className="succes-num">
                You attempted {score} out of 10 questions as correct.
              </p>
              <Link to="/game-report">
                <button type="button" className="report-button">
                  Report
                </button>
              </Link>
            </div>
          )
        } else {
          return (
            <div className="failure-background">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
                alt="lose"
                className="loss-img"
              />
              <h1 className="succes-heading">You lose!</h1>
              <p className="succes-para">{score * 10}% Correctly Answered</p>
              <p className="succes-num">
                You attempted {score} out of 10 questions as correct.
              </p>
              <Link to="/game-report">
                <button type="button" className="report-button">
                  Report
                </button>
              </Link>
            </div>
          )
        }
      }
      return (
        <>
          <Header />
          <div className="success-container">{renderScoreDetails()}</div>
        </>
      )
    }}
  </QuizContext.Consumer>
)

export default GameResults
