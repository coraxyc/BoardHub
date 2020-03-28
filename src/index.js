import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import { ReactComponent as IconEdit } from './assets/icon-edit.svg';
import { ReactComponent as IconFilePlus } from './assets/icon-file-plus.svg';
import { ReactComponent as IconTrash } from './assets/icon-trash.svg';

function PostItAddButton(props) {
  return (
    <div className="postit bg-blue center" onClick={props.onClick}>
      <IconFilePlus className="icon-margin2 icon-medium"/>
    </div>
  );
}

function PostIt(props) {
  return (
    <div className="postit">
      <div className="icon-row">
        <IconTrash className="icon-trash icon-margin2 icon-small icon-top icon-right" onClick={props.onClick}/>
        <IconEdit className="icon-edit icon-margin2 icon-small icon-top icon-right"/>
      </div>
      <div className="postit-title">
        {props.title}
      </div>
      <div className="postit-body">
        {props.body}
      </div>
    </div>
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

  renderPostItAddButton() {
    return (
      <PostItAddButton
        onClick={() => this.addPostIt()}
      />
    );
  }

  addPostIt() {
    this.idCounter += 1;
    this.setState({
      postits: [...this.state.postits, 
        { id: this.idCounter,
          title: "Title " + this.idCounter,
          body: "Body " + (this.idCounter)}]
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
        title={postit.title}
        body={postit.body}
        onClick={() => this.removeNthPostIt(postit.id)} 
      />
    );
    return (
      <div>
        <div className="board-row">
            {this.renderPostItAddButton()}
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