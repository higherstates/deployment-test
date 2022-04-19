import Board from '../Board/Board'
import Keyboard from '../Keyboard/Keyboard'
import ErrorToast from '../ErrorToast/ErrorToast'
import ShareModal from '../ShareModal/ShareModal'


const Game = () => {
  return (
    <div id="game">
      <ShareModal />
      <ErrorToast />
      <Board />
      <Keyboard />
    </div>
  )
}

export default Game