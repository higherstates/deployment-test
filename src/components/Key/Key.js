import { useContext } from 'react'
import { AppContext } from "../../App"
import { IoBackspaceOutline } from 'react-icons/io5'

const Key = ({ keyVal, disabled, correct, present }) => {
  const { onSubmit, onDelete, onSelect } = useContext(AppContext)

  const selectLetter = () => {
    if (keyVal === "enter") {
      onSubmit()
    } else if (keyVal === "backspace") {
     onDelete()
    } else {
     onSelect(keyVal)
    }
  }

  return (
    <button 
      className={ keyVal === 'backspace' || keyVal === 'enter' ? "flex-one-half" : ""}
      tabIndex="-1"
      id={
        disabled ? "absent" 
        : correct ? "correct"
        : present ? "present"
        : undefined
      }
      onClick={selectLetter}
      data-key={keyVal}
    >
      {keyVal === "backspace" ? <IoBackspaceOutline style={{ fontSize: '1.6rem' }} title="Backspace" /> : keyVal}
    </button>
  )
}

export default Key