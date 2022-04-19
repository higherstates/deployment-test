import { useEffect, useContext } from "react"
import { AppContext } from "../../App"

const Tile = ({ letterPosition, attemptValue }) => {
  const { board, correctWord, currentAttempt, setDisabledKey, setPresentKey, setCorrectKey } = useContext(AppContext)
  
  const letter = board[attemptValue][letterPosition].toUpperCase()

  const correct = correctWord.toUpperCase()[letterPosition] === letter
  const present = !correct && letter !== "" && correctWord.toUpperCase().includes(letter)

  const letterState = currentAttempt.attempt > attemptValue && (correct ? "correct" : present ? "present" : "absent")

  useEffect(() => {
    if (letter !== "" && !correct && !present) {
      setDisabledKey((prev) => [...prev, letter])
    } else if (letter !== "" && !correct && present) {
      setPresentKey((prev) => [...prev, letter])
    } else {
      setCorrectKey((prev) => [...prev, letter])
    }
  }, [currentAttempt.attempt])

  return (
    <div className="board__tile" id={letterState ? letterState : ""}>{letter}</div>
  )
}

export default Tile