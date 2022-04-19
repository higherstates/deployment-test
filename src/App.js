import './App.css'
import Header from './components/Header/Header'
import Game from './components/Game/Game'
import { boardDefault } from './helpers/Words'
import { useState, useEffect, createContext } from 'react'
import words from './helpers/words.json'

export const AppContext = createContext()

function App() {

  const [errorToast, setErrorToast] = useState(false)
  const [fiveLetters, setFiveLetters] = useState(false)
  const [wordCheck, setWordCheck] = useState(false)

  const [disabledKey, setDisabledKey] = useState([])
  const [presentKey, setPresentKey] = useState([])
  const [correctKey, setCorrectKey] = useState([])

  const [showModal, setShowModal] = useState(false)
  
  const [boardData, setBoardData] = useState(JSON.parse(localStorage.getItem('board-data')))
  const [board, setBoard] = useState(boardData ? boardData.boardState : boardDefault() )
  const [currentAttempt, setCurrentAttempt] = useState(boardData ? boardData.currentAttempt : { attempt: 0, letterPosition: 0 })

  const [gameOver, setGameOver] = useState(boardData ? boardData.status : { gameOver: false, guessedWord: false })
  const [correctWord, setCorrectWord] = useState(boardData ? boardData.solution : "")

  // loop through each row, check if it's the correct word, if same green emoji
  

  // RESET GAME AFTER 10MINS:
  const TEN_MINUTES = 600
  const [counter, setCounter] = useState(TEN_MINUTES)
  const seconds = String(counter % 60).padStart(2, 0);
  const minutes = String(Math.floor(counter / 60)).padStart(2, 0);

  const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * words.length)
    setCorrectWord(words[randomIndex])
    let newBoardData = {
      ...boardData, 
      "createdAt": new Date().getTime(), 
      "currentAttempt": {attempt: 0, letterPosition: 0},
      "boardState": boardDefault(),
      "status": { gameOver: false, guessedWord: false },
      "solution": words[randomIndex],
    }
    setCounter(TEN_MINUTES)
    setBoardData(newBoardData)
    setCurrentAttempt({ attempt: 0, letterPosition: 0 })
    setDisabledKey([])
    setPresentKey([])
    setCorrectKey([])
    setGameOver({ gameOver: false, guessedWord: false })
    setBoard(boardDefault())
    localStorage.setItem("board-data", JSON.stringify(newBoardData));
  }

  // TIMER:
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter((time) => time - 1), 1000)
    return () => clearInterval(timer)
  },[counter])

  if (counter === 0) {
    resetGame()
  }

  // ON PAGE LOAD:
  useEffect(() => {
    const TIME_IN_S = localStorage.getItem('board-data') ? Math.trunc((new Date().getTime() - JSON.parse(localStorage.getItem('board-data')).createdAt) / 1000) : TEN_MINUTES + 1

    if (TIME_IN_S > TEN_MINUTES) {
      resetGame()
    }

    setCounter(TEN_MINUTES - (TIME_IN_S % TEN_MINUTES))

    if (correctWord === "") {
      setBoard([...board])
    }

  }, []);


  const onSelect = (keyVal) => {
    if (currentAttempt.letterPosition > 4) return
    const newBoard = [...board]
    // Do nothing if trying to type over 6 attempts:
    if(!gameOver.gameOver) {
      if(currentAttempt.attempt <= 5) {
        newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyVal
        setBoard(newBoard)
        setCurrentAttempt({...currentAttempt, letterPosition: currentAttempt.letterPosition + 1})
      } else return
    }
  }

  const onDelete = () => {
    if (currentAttempt.letterPosition === 0) return
    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = ""
    setBoard(newBoard)
    setCurrentAttempt({...currentAttempt, letterPosition: currentAttempt.letterPosition - 1})
  }

  const onSubmit = () => {
    // If out of attempts, don't do anything:
    if (currentAttempt.attempt === 6) {
      setShowModal(true)
      return
    }
    
    let currentWord = ""
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i]
    }

    // If game over, don't do anything:
    if (gameOver.gameOver) return
    
    // Got the correct word, display share pop-up:
    if (currentWord === correctWord) {
      let newBoardData = {
        ...boardData, 
        "boardState": [...board],
        "currentAttempt": { attempt: currentAttempt.attempt + 1, letterPosition: 0},
        "status": { gameOver: true, guessedWord: true}
      }
      localStorage.setItem("board-data", JSON.stringify(newBoardData));
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPosition: 0})
      setFiveLetters(true)
      setGameOver({ gameOver: true, guessedWord: true })
      setShowModal(true)
      console.log("You win!")
      return

      // If submitted 6 times, display share popup:
    } else if (currentAttempt.attempt === 5 && currentAttempt.letterPosition === 5 && currentWord !== correctWord) {
      let newBoardData = {
        ...boardData, 
        "boardState": [...board],
        "currentAttempt": { attempt: currentAttempt.attempt + 1, letterPosition: 0},
        "status": { gameOver: true, guessedWord: false }
      }
      localStorage.setItem("board-data", JSON.stringify(newBoardData));
      setGameOver({ gameOver: true, guessedWord: false })
      setShowModal(true)
      console.log("End game, you lose")
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPosition: 0})
      return
    }

    // If word has 5 letters and is in word list:
    if (currentAttempt.letterPosition === 5 && words.includes(currentWord.toLowerCase())) {
      let newBoardData = {
        ...boardData, 
        "boardState": [...board],
        "currentAttempt": { attempt: currentAttempt.attempt + 1, letterPosition: 0},
      }
      localStorage.setItem("board-data", JSON.stringify(newBoardData));

      setFiveLetters(true)
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPosition: 0})
      console.log("Keep trying")
    } else if (currentAttempt.letterPosition === 5 && !words.includes(currentWord.toLowerCase()) ) {
      // Display error toast if word is invalid:
      setFiveLetters(true)
      setWordCheck(false)
      setErrorToast(true)
      console.log("Weird word")
    } else {
      // If less than 5 letters, display error toast:
      setFiveLetters(false)
      setErrorToast(true)
      console.log("Less than 5 letters")
    }

  }
      
  return (
    <div className="App">
      <AppContext.Provider 
        value={{ board, setBoard, currentAttempt, setCurrentAttempt, onSelect, onDelete, onSubmit, correctWord, errorToast, setErrorToast, fiveLetters, wordCheck, disabledKey, setDisabledKey, presentKey, setPresentKey, correctKey, setCorrectKey, gameOver, setGameOver, showModal, setShowModal, counter, setCounter, seconds, minutes, boardData }}
      >
        <Header />
        <Game />
      </AppContext.Provider>
    </div>
  );
}

export default App;
