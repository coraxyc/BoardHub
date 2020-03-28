import React from 'react';
import '../styles/postit.css';
import '../styles/icon.css';

import { ReactComponent as IconTrash } from '../assets/icon-trash.svg';
import { ReactComponent as IconEdit } from '../assets/icon-edit.svg';

class PostIt extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isEditEnabled: false,
        title: this.props.title,
        body: this.props.body
      }
    }
  
    toggleEditing(isEditEnabled) {
      this.setState({
        isEditEnabled: isEditEnabled,
        title: this.state.title,
        body: this.state.body
      });
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
  
      var title = this.state.title.trim();
      var body = this.state.body.trim();
      console.log("handleSubmit");
      console.log("title: " + title);
      console.log("body: " + body);
      var object = {id: this.props.id, title: this.state.title, body: this.state.body};
      console.log(object);
      this.props.savePostIt(this.props.id, object);
  
      this.toggleEditing(false);
    }
  
    handleReset(e) {
      e.preventDefault();
      this.setState({
        isEditEnabled: false,
        title: this.props.title,
        body: this.props.body
      });
    }
  
    render() {
      return (
        <div className="postit">
          <div className="icon-row">
            <IconTrash className="icon-trash icon-margin2 icon-small icon-top icon-right" onClick={this.props.onRemove}/>
            <IconEdit className="icon-edit icon-margin2 icon-small icon-top icon-right" onClick={this.toggleEditing.bind(this, true)}/>
          </div>
          <form className="postit-form" onSubmit={this.handleSubmit.bind(this)} onReset={this.handleReset.bind(this)}>
            <div className="postit-title">
              <input className="postit-input input-title" type="text" value={this.state.title} disabled={!this.state.isEditEnabled} onChange={this.handleTextChange.bind(this, 'title')} />
            </div>
            <div className="postit-body">
              <textarea className="postit-input input-body" type="text" value={this.state.body} disabled={!this.state.isEditEnabled} onChange={this.handleTextChange.bind(this, 'body')} />
            </div>
            { this.state.isEditEnabled ? <PostItSubmit/> : null }
          </form>
        </div>
      );
    }
}

function PostItSubmit(props) {
    return (
        <div>
        <input type="submit" value="Save" className="postit-submit"/>
        <input type="reset" value="Reset" className="postit-submit"/>
        </div>
    );
}

export default PostIt;