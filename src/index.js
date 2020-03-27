import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function PostIt(props) {
  return (
    <button className="postit" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postits: []
    };

    this.idCounter = 0;
  }

  renderInitialPostIt(i) {
    if(i === '+') {
      return (
        <PostIt
          value={i} 
          onClick={() => this.addPostIt(i)}
        />
      );
    }
  }

  addPostIt() {
    this.idCounter += 1;
    this.setState({
      postits: [...this.state.postits, 
        { id: this.idCounter,
          title: this.idCounter,
          text: "abc " + (this.idCounter)}]
    });
  }

  removeNthPostIt(id) {
    const currState = this.state;
    const index = currState.postits.findIndex(p => p.id === id);
    currState.postits.splice(index, 1);
    this.setState(currState);
  }

  render() {
    const postits = this.state.postits;
    const listPostits = postits.map(postit => 
      <PostIt 
        key={postit.id.toString()} 
        value={postit.text} 
        onClick={() => this.removeNthPostIt(postit.id)} 
        />
    );
    return (
      <div>
        <div className="board-row">
            {this.renderInitialPostIt('+')}
            {listPostits}
        </div>
      </div>
    );
  }
}

class Bulletin extends React.Component {
  render() {
    return (
      <div className="bulletin">
        <div className="bulletin-board">
          <Board/>
        </div>
      </div>
    );
  }
}

ReactDOM.render( 
  <Bulletin/>, 
  document.getElementById('root')
);