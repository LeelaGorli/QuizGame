import './index.css'

const ImageOptions = props => {
  const {optionDetails, onClickOption} = props
  const updatedData = {
    id: optionDetails.id,
    text: optionDetails.text,
    imageUrl: optionDetails.image_url,
    isCorrect: optionDetails.is_correct,
  }

  const clickOption = () => {
    onClickOption(updatedData.id)
  }

  return (
    <li className="list-style">
      <img
        src={updatedData.imageUrl}
        onClick={clickOption}
        alt={updatedData.text}
        className="option-img"
      />
    </li>
  )
}

export default ImageOptions
