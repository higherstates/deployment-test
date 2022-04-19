import Board from '../Board/Board'
import Keyboard from '../Keyboard/Keyboard'
import ErrorToast from '../Toast/ErrorToast'
import CopyToast from '../Toast/CopyToast'
import ShareModal from '../ShareModal/ShareModal'


const Game = () => {
  return (
    <div id="game">
      <CopyToast />
      <ShareModal />
      <ErrorToast />
      <Board />
      <Keyboard />
    </div>
  )
}

export default Game