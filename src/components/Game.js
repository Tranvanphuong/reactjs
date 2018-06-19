import React from 'react';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let i=0; i < lines.length; i++) {
    var [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        // Chúng ta sẽ gửi về 2 giá trị là: Người thắng cuộc và vị trí thắng cuộc.
        winnerPlayer: squares[a],
        winnerLocation: [a,b,c]
      }
    }
  }
  return;
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      // Thêm mảng history vào, trong history lưu object squares như trước
      history: [{
        squares: Array(9).fill(null),
        moveLocation: '',
      }],
      xIsNext: true,
      stepNumber: 0,
      // Thêm isReverse để nhận biết hướng sắp xếp
      isReverse: false,
    };
  }

  handleClick(i) {
    // Chúng ta cần clone history ra bản phụ tránh làm ảnh hưởng bản chính
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // Lấy history của lần gần nhất
    const current = history[history.length - 1];
    // Clone object squares của thằng current
    const squares = current.squares.slice();

    if(squares[i] || calculateWinner(squares)) {
      return ;
    }

    const gameSize = Math.sqrt(history[0].squares.length);
    // (row = vị trí / matrixSize, col = vị trí % matrixSize)
    const moveLocation = [Math.floor(i / gameSize + 1), i % gameSize + 1].join(', ');

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      // Thêm history mỗi khi click vào ô vuông
      history: history.concat([{
        squares,
        moveLocation
      }]),
      xIsNext: !this.state.xIsNext,
      // stepNumber bằng với độ dài của history.
      stepNumber: history.length,
    });
  }

  jumpTo(move) {
    this.setState({
      xIsNext: (move % 2) ? false : true,
      stepNumber: move,
    })
  }

  reverseSort(isReverse) {
    this.setState({
      isReverse: !isReverse,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const isReverse = this.state.isReverse;
    let status;

    if(winner) {
      // Nếu winner có giá trị thì sẽ hiển thị người thắng cuộc
      status = `Winner is: ${winner.winnerPlayer}`;
    } else if(this.state.stepNumber === 9) {
      // Nếu sau 9 lần chưa có ai win thì hòa
      status = "Draw";
    } else {
      status = `Next player is: ${this.state.xIsNext ? 'X': 'O'}`;
    }

    const moves = history.map((step, move) => {
      // move = 0 là lúc game mới start.
      // Thêm moveLocation vào
      const desc = move ? `Move #${move} (${step.moveLocation})` : 'Start game';
      return(
        <li key={move}>
          <a
            href="#"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </a>
        </li>
      );
    });

    // Định nghĩa hàm handleClick và gửi nó qua cho Board
    // Sử dụng && để phòng T.Hợp winner là null
    return(
      <div>
        <div className="game">
          <Board squares={current.squares}
            onClick={i => this.handleClick(i)}
            winner={winner && winner.winnerLocation} />
        </div>
        <div className="game-info">
          <p>{status}</p>
          <ol reversed={isReverse ? 'reverse' : ''}>{isReverse ? moves.reverse() : moves}</ol>
          <button onClick={() => this.reverseSort(isReverse)}>Reverse list</button>
        </div>
      </div>
    );
  }
}

export default Game;
