import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import QuizContext from '../../context/QuizContext'

import Header from '../Header'
import DefaultOptions from '../DefaultOptions'
import ImageOptions from '../ImageOptions'
import RadioOptions from '../RadioOptions'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Questions extends Component {
  state = {
    questionsList: [],
    total: 0,
    score: 0,
    time: 15,
    questionIndex: 0,
    unAttemptedList: [],
    nextEnable: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getQuestions()
    this.timerID = setInterval(this.tick, 1000)
  }

  getRetry = () => {
    this.getQuestions()
  }

  getQuestions = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/assess/questions'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.questions.map(question => ({
        id: question.id,
        optionsType: question.options_type,
        questionText: question.question_text,
        options: question.options,
      }))
      console.log(updatedData)
      this.setState({
        questionsList: updatedData,
        total: fetchedData.total,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickOption = id => {
    const {questionIndex, questionsList, time} = this.state
    const questionHis = questionsList[questionIndex]
    clearInterval(this.timerID)
    this.setState({
      nextEnable: false,
    })
    const correct = questionHis.options.find(each => {
      if (each.id === id) {
        return each.is_correct
      }
    })
    if (correct === 'true' && time > 0) {
      this.setState(prevState => ({
        score: prevState.score + 1,
      }))
    }
  }

  changeQuestion = () => {
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex + 1,
      nextEnable: true,
      time: 15,
    }))
    this.timerID = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {time, questionIndex, questionsList} = this.state
    if (time > 0) {
      this.setState(prevState => ({
        time: prevState.time - 1,
      }))
    } else {
      clearInterval(this.timerID)
      this.setState(prevState => ({
        questionIndex: prevState.questionIndex + 1,
        unAttemptedList: [
          ...prevState.unAttemptedList,
          questionsList[questionIndex],
        ],
        time: 15,
        nextEnable: true,
      }))
      this.timerID = setInterval(this.tick, 1000)
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="faiure-text">Something went wrong</h1>
      <p className="failure-descrip">Our servers are busy please try again</p>
      <button onClick={this.getRetry} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderOptionsList = () => {
    const {questionIndex, questionsList} = this.state
    const questionHis = questionsList[questionIndex]
    if (questionHis.optionsType === 'DEFAULT') {
      return (
        <ul className="defaultOptions-container">
          {questionHis.options.map(eachOption => (
            <DefaultOptions
              key={eachOption.id}
              optionDetails={eachOption}
              onClickOption={this.onClickOption}
            />
          ))}
        </ul>
      )
    } else if (questionHis.optionsType === 'IMAGE') {
      return (
        <ul className="defaultOptions-container">
          {questionHis.options.map(eachOption => (
            <ImageOptions
              key={eachOption.id}
              optionDetails={eachOption}
              onClickOption={this.onClickOption}
            />
          ))}
        </ul>
      )
    } else {
      return (
        <ul className="radioOptions-container">
          {questionHis.options.map(eachOption => (
            <RadioOptions
              key={eachOption.id}
              optionDetails={eachOption}
              onClickOption={this.onClickOption}
            />
          ))}
        </ul>
      )
    }
  }

  renderSuccesView = () => {
    const {
      questionIndex,
      questionsList,
      unAttemptedList,
      score,
      time,
      total,
      nextEnable,
    } = this.state
    const questionHis = questionsList[questionIndex]
    const buttonEL =
      questionIndex === 9 ? (
        <Link to="/game-results">
          <button disabled={nextEnable} className="next-button" type="button">
            Submit
          </button>
        </Link>
      ) : (
        <button
          onClick={this.changeQuestion}
          disabled={nextEnable}
          className="next-button"
          type="button"
        >
          Next Question
        </button>
      )
    return (
      <QuizContext.Provider
        value={{
          score,
          unAttemptedList,
        }}
      >
        <div>
          <div className="question-time-container">
            <div className="question-container">
              <p className="question-number">Question</p>
              <p className="question-count">
                {questionIndex + 1}/{total}
              </p>
            </div>
            <div className="timer-container">
              <p className="timer-count">{time}</p>
            </div>
          </div>
          <li className="question-list">
            <p className="question-text">{questionHis.questionText}</p>
            {this.renderOptionsList()}
          </li>
          <div className="button-align">{buttonEL}</div>
        </div>
      </QuizContext.Provider>
    )
  }

  renderQuestionsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-container">
          <div className="questions-container">
            {this.renderQuestionsList()}
          </div>
        </div>
      </>
    )
  }
}

export default Questions
