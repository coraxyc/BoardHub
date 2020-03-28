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

class PostIt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditEnabled: false,
      title: this.props.title,
      body: this.props.body
    }
  }

  toggleEditing() {
    this.setState({isEditEnabled: !this.state.isEditEnabled});
  }

  handleTextChange(field, event) {
    if(event.target == null) {
      return;
    }
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.toggleEditing();

    var title = this.state.title.trim();
    var body = this.state.body.trim();
    console.log("handleSubmit");
    console.log("title: " + title);
    console.log("body: " + body);
    var object = {id: this.props.id, title: this.state.title, body: this.state.body};
    console.log(object);
    this.props.savePostIt(this.props.id, object);
  }

  render() {
    return (
      <div className="postit">
        <div className="icon-row">
          <IconTrash className="icon-trash icon-margin2 icon-small icon-top icon-right" onClick={this.props.onRemove}/>
          <IconEdit className="icon-edit icon-margin2 icon-small icon-top icon-right" onClick={this.toggleEditing.bind(this)}/>
        </div>
        <form className="postit-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="postit-title">
            <input type="text" value={this.state.title} disabled={!this.state.isEditEnabled} onChange={this.handleTextChange.bind(this, 'title')} />
          </div>
          <div className="postit-body">
            <input type="text" value={this.state.body} disabled={!this.state.isEditEnabled} onChange={this.handleTextChange.bind(this, 'body')} />
          </div>
          { this.state.isEditEnabled ? <PostItSubmit/> : null }
        </form>
      </div>
    );
  }
}

function PostItSubmit(props) {
  return <input type="submit" value="Save" className="postit-submit"/>;
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