import React from 'react'

const QuizContext = React.createContext({
  score: 0,
  unAttemptedList: [],
  addUnattemptQuestion: () => {},
})

export default QuizContext
