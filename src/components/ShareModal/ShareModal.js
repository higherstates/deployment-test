import { useContext } from 'react'
import { AppContext } from '../../App'
import { Modal, Button } from 'react-bootstrap'
import { AiOutlineShareAlt, AiOutlineClose } from 'react-icons/ai'

const ShareModal = () => {
  const { gameOver, showModal, setShowModal, currentAttempt, copyToast, setCopyToast } = useContext(AppContext)

  const getTime = () => {
    const today = new Date()
    const date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    return `${date} ${time}`
  }

  const copyResult = async () => {
    let shareEmoji = ""
    let shareText = `Wordle ${getTime()} ${!gameOver.guessedWord ? "X" : currentAttempt.attempt}/6 \n ${shareEmoji}`

    await navigator.clipboard.writeText(shareText)
    setCopyToast(true)
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
        <Modal.Title>{gameOver.guessedWord ? "You Win!" : "Game Over"}</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            CLOSE
            <AiOutlineClose />
          </Button>
          <Button onClick={copyResult} variant="primary">
            SHARE
            <AiOutlineShareAlt />
          </Button>
        </Modal.Body>
    </Modal>
  );
}

export default ShareModal;
