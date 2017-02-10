'use strict';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../../scss/components/_wysiwyg.scss';

import React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {ContentState, EditorState, convertFromHTML, convertToRaw} from 'draft-js';

class WysiwygWrapper extends React.Component {

  static propTypes = {
    formInput: React.PropTypes.object.isRequired
  };

  static MODE = {
    EDITOR: 'editor',
    RAW: 'raw'
  };

  editorContentHtml;

  constructor(props) {
    super(props);

    const editorContentHtml = this.props.formInput.value;
    const editorContentState = this.getEditorContentStateFromHtml(editorContentHtml);

    this.state = {
      editorMode: WysiwygWrapper.MODE.EDITOR,
      editorState: EditorState.createWithContent(editorContentState),
      textareaState: editorContentHtml
    };

    // Pre bind mthod's context
    this.boundOnEditorStateChange = this.onEditorStateChange.bind(this);
    this.boundOnTextareaStateChange = this.onTextareaStateChange.bind(this);
  }

  getEditorContentStateFromHtml(htmlContent) {
    const htmlBlocks = convertFromHTML(htmlContent);
    return ContentState.createFromBlockArray(htmlBlocks);
  }

  onEditorStateChange(editorState) {
    const editorContentHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.persistChanges(editorContentHtml, editorState);
  }

  onTextareaStateChange(event) {
    const editorContentHtml = event.target.value;
    const editorContentState = this.getEditorContentStateFromHtml(editorContentHtml);
    this.persistChanges(editorContentHtml, EditorState.createWithContent(editorContentState));
  }

  persistChanges(editorContentHtml, editorState) {
    this.setFormInputValue(editorContentHtml);
    this.setState({
      editorState: editorState,
      textareaState: editorContentHtml
    });
  }

  setFormInputValue(value) {
    const {formInput} = this.props;
    formInput.value = value;
  }

  onEditorModeSelected(editorMode) {
    this.setState({
      editorMode: editorMode
    });
  }

  render() {
    const {editorMode, editorState, textareaState} = this.state;
    const
      tabInactiveStyle = 'tab__button--inactive',
      editorModeTabStyle = 'tab__button ' + (editorMode !== WysiwygWrapper.MODE.EDITOR ? tabInactiveStyle : ''),
      rawModeTabStyle = 'tab__button ' + (editorMode !== WysiwygWrapper.MODE.RAW ? tabInactiveStyle : '');

    return <div className="tabs">
      <div className="tab__button-group">
        <div
          className={editorModeTabStyle}
          onClick={this.onEditorModeSelected.bind(this, WysiwygWrapper.MODE.EDITOR)}>
          {WysiwygWrapper.MODE.EDITOR}
        </div>
        <div
          className={rawModeTabStyle}
          onClick={this.onEditorModeSelected.bind(this, WysiwygWrapper.MODE.RAW)}>
          {WysiwygWrapper.MODE.RAW}
        </div>
      </div>
      <div className="tabs__content">
        <div
          className="tab__content"
          style={{
            display: editorMode === WysiwygWrapper.MODE.EDITOR ? 'block' : 'none'
          }}>
          <Editor
            editorState={editorState}
            onEditorStateChange={this.boundOnEditorStateChange}
          />
        </div>
        <div
          className="tab__content"
          style={{
            display: editorMode === WysiwygWrapper.MODE.RAW ? 'block' : 'none'
          }}>
          <textarea
            className="wysiwyg__textarea"
            onChange={this.boundOnTextareaStateChange}
            value={textareaState}/>
        </div>
      </div>
    </div>;
  }
}

export default WysiwygWrapper;
