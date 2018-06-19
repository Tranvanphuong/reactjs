import React from 'react';

class Square extends React.Component {
  render() {
    const classNames = `square ${this.props.winner}`;
    return(
      <button
        className={classNames}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Square;
