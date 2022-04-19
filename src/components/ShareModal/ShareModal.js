import { useState, useContext } from 'react'
import { AppContext } from '../../App'
import { Modal, Button } from 'react-bootstrap'
import { AiOutlineShareAlt, AiOutlineClose } from 'react-icons/ai'

const ShareModal = () => {
  const { correctWord, gameOver, showModal, setShowModal, currentAttempt } = useContext(AppContext)

  
  const getTime = () => {
    const today = new Date()
    const date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    return `${date} ${time}`
  }

  const copy = async () => {
    // The attempt count must be left:
    let shareEmoji = ""
    let shareText = `Wordle ${getTime()} ${!gameOver.guessedWord ? "X" : currentAttempt.attempt}/6 \n ${shareEmoji}`
    console.log(shareEmoji)

    const bst = JSON.parse(localStorage.getItem('board-data')).boardState
    bst.map((row) => {
      const correctWordArr = correctWord.split('')
      console.log(row, correctWordArr)
      if (row === correctWordArr) {
        return shareEmoji += "🟩"

      }
      row.forEach((letter) => {
  
      })
    })



    await navigator.clipboard.writeText(shareText)
    alert('Result copied')
  }



  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Modal.Title>Game Over</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            CLOSE
            <AiOutlineClose />
          </Button>
          <Button onClick={copy} variant="primary">
            SHARE
            <AiOutlineShareAlt />
          </Button>
        </Modal.Body>
    </Modal>
  );
}

export default ShareModal;
