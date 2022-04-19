import Tile from '../Tile/Tile'

const Board = () => {

  return (
    <div id="board-container">
      <div className="board">
        <div className="board__row">
          <Tile letterPosition={0} attemptValue={0} />
          <Tile letterPosition={1} attemptValue={0} />
          <Tile letterPosition={2} attemptValue={0} />
          <Tile letterPosition={3} attemptValue={0} />
          <Tile letterPosition={4} attemptValue={0} />
        </div>
        <div className="board__row">
          <Tile letterPosition={0} attemptValue={1} />
          <Tile letterPosition={1} attemptValue={1} />
          <Tile letterPosition={2} attemptValue={1} />
          <Tile letterPosition={3} attemptValue={1} />
          <Tile letterPosition={4} attemptValue={1} />
        </div>
        <div className="board__row">
          <Tile letterPosition={0} attemptValue={2} />
          <Tile letterPosition={1} attemptValue={2} />
          <Tile letterPosition={2} attemptValue={2} />
          <Tile letterPosition={3} attemptValue={2} />
          <Tile letterPosition={4} attemptValue={2} />
        </div>
        <div className="board__row">
          <Tile letterPosition={0} attemptValue={3} />
          <Tile letterPosition={1} attemptValue={3} />
          <Tile letterPosition={2} attemptValue={3} />
          <Tile letterPosition={3} attemptValue={3} />
          <Tile letterPosition={4} attemptValue={3} />
        </div>
        <div className="board__row">
          <Tile letterPosition={0} attemptValue={4} />
          <Tile letterPosition={1} attemptValue={4} />
          <Tile letterPosition={2} attemptValue={4} />
          <Tile letterPosition={3} attemptValue={4} />
          <Tile letterPosition={4} attemptValue={4} />
        </div>
        <div className="board__row">
          <Tile letterPosition={0} attemptValue={5} />
          <Tile letterPosition={1} attemptValue={5} />
          <Tile letterPosition={2} attemptValue={5} />
          <Tile letterPosition={3} attemptValue={5} />
          <Tile letterPosition={4} attemptValue={5} />
        </div>
      </div>
    </div>
  );
}

export default Board;
