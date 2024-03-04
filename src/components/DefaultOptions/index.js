import './index.css'

const DefaultOptions = props => {
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
      <button type="button" onClick={clickOption} className="option-button">
        {updatedData.text}
      </button>
    </li>
  )
}

export default DefaultOptions
