/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */

import {React, reactDraftWysiwyg, draftToHtml, draftJs} from './../../bundle.dependencies';
import {Tabbed, IconTextEditor, IconRawEditor} from './../../bundle.components';
import {setFormInputValue} from './../../bundle.util';

import Tab from './../Tabbed/Tab';

const
  Editor = reactDraftWysiwyg.Editor,
  ContentState = draftJs.ContentState,
  EditorState = draftJs.EditorState,
  convertFromHTML = draftJs.convertFromHTML,
  convertToRaw = draftJs.convertToRaw;

class Wysiwyg extends React.Component {

  static propTypes = {
    formInput: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const editorContentHtml = this.props.formInput.value;
    const editorContentState = this.getEditorContentStateFromHtml(editorContentHtml);

    this.state = {
      selectedTabIndex: 0,
      editorState: EditorState.createWithContent(editorContentState),
      textareaState: editorContentHtml
    };

    // Pre bind mthod's context
    this.boundOnTabSelected = this.onTabSelected.bind(this);
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
    const {formInput} = this.props;
    setFormInputValue(formInput, editorContentHtml);
    this.setState({
      editorState: editorState,
      textareaState: editorContentHtml
    });
  }

  onTabSelected(tabIndex) {
    this.setState({
      selectedTabIndex: tabIndex
    });
  }

  render() {
    const {selectedTabIndex, editorState, textareaState} = this.state;
    return <Tabbed
      onTabSelected={this.boundOnTabSelected}
      selectedTabIndex={selectedTabIndex}>
      <Tab label={
        <label className="tabbed__label-content">
          <IconTextEditor/>Editor
        </label>
      }>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.boundOnEditorStateChange}/>
      </Tab>
      <Tab label={
        <label className="tabbed__label-content">
          <IconRawEditor/>Raw
        </label>
      }>
        <textarea
          className="wysiwyg__textarea"
          onChange={this.boundOnTextareaStateChange}
          value={textareaState}/>
      </Tab>
    </Tabbed>;
  }
}

export default Wysiwyg;
