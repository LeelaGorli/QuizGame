import './index.css'

const RadioOptions = props => {
  const {optionDetails, onClickOption} = props
  const updatedData = {
    id: optionDetails.id,
    text: optionDetails.text,
    isCorrect: optionDetails.is_correct,
  }

  const clickOption = () => {
    onClickOption(updatedData.id)
  }

  return (
    <li className="list-style">
      <input type="radio" id={updatedData.id} onChange={clickOption} />
      <label htmlFor={updatedData.id}>{updatedData.text}</label>
    </li>
  )
}

export default RadioOptions
