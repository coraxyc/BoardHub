import React from 'react';
import '../styles/icon.css';
import '../styles/board.css';

import { ReactComponent as IconFilePlus } from '../assets/icon-file-plus.svg';
import PostIt from './PostIt';

export function PostItAddButton(props) {
    return (
      <div className="postit bg-blue center" onClick={props.onClick}>
        <IconFilePlus className="icon-margin2 icon-medium"/>
      </div>
    );
}

class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        postits: []
      };
  
      this.isEditEnabled = false;
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
  
    removePostIt(id) {
      const currState = this.state;
      const index = currState.postits.findIndex(p => p.id === id);
      currState.postits.splice(index, 1);
      this.setState(currState);
    }
  
    savePostIt(id, updatedPostIt) {
      console.log("savePostIt");
      console.log(id);
      if(updatedPostIt == null) {
        console.log("updatedPostIt is null");
        return;
      }
      console.log(updatedPostIt);
      const currState = this.state;
      const index = currState.postits.findIndex(p => p.id === id);
      currState.postits[index] = updatedPostIt;
      this.setState(currState);
    }
  
    render() {
      const postits = this.state.postits;
      const listPostits = postits.map(postit => 
        <PostIt 
          key={postit.id.toString()}
          id={postit.id}
          title={postit.title}
          body={postit.body}
          onRemove={() => this.removePostIt(postit.id)}
          onEdit={() => this.editPostIt(postit.id)}
          savePostIt={this.savePostIt.bind(this)}
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

export default Board;