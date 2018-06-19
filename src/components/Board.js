import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    const {squares, winner} = this.props;
    return <Square
      value={squares[i]}
      onClick={() => this.props.onClick(i)}
      winner={winner && winner.includes(i) ? 'winner' : ''}
    />
  }

  renderBoard() {
    const rowsWidth = Array(Math.sqrt(this.props.squares.length)).fill(null);
    const celsWidth = rowsWidth;
    const board = rowsWidth.map((row, i) => {
      const squares = celsWidth.map((cel, j) => {
        const squareIndex = i * rowsWidth.length + j;
        return(
          <span
            key={squareIndex}
          >
            {this.renderSquare(squareIndex)}
          </span>
        );
      });
      return <div key={i}>{squares}</div>
    });
    return board;
  }

  render() {
    const board = this.renderBoard();
    return(
      <div>{board}</div>
    );
  }
}

export default Board;