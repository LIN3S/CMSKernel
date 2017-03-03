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

import React from 'react';
import * as reactDraftWysiwyg from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import * as draftJs from 'draft-js';


class TemplateSelector {
  constructor() {
    console.log('lalalal');
  }
}
// const
//   Editor = reactDraftWysiwyg.Editor,
//   ContentState = draftJs.ContentState,
//   EditorState = draftJs.EditorState,
//   convertFromHTML = draftJs.convertFromHTML,
//   convertToRaw = draftJs.convertToRaw;
//
// class Wysiwyg extends React.Component {
//
//   static propTypes = {
//     formInput: React.PropTypes.object.isRequired
//   };
//
//   static MODE = {
//     EDITOR: 'editor',
//     RAW: 'raw'
//   };
//
//   constructor(props) {
//     super(props);
//
//     const editorContentHtml = this.props.formInput.value;
//     const editorContentState = this.getEditorContentStateFromHtml(editorContentHtml);
//
//     this.state = {
//       editorMode: Wysiwyg.MODE.EDITOR,
//       editorState: EditorState.createWithContent(editorContentState),
//       textareaState: editorContentHtml
//     };
//
//     // Pre bind mthod's context
//     this.boundOnEditorStateChange = this.onEditorStateChange.bind(this);
//     this.boundOnTextareaStateChange = this.onTextareaStateChange.bind(this);
//   }
//
//   getEditorContentStateFromHtml(htmlContent) {
//     const htmlBlocks = convertFromHTML(htmlContent);
//     return ContentState.createFromBlockArray(htmlBlocks);
//   }
//
//   onEditorStateChange(editorState) {
//     const editorContentHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
//     this.persistChanges(editorContentHtml, editorState);
//   }
//
//   onTextareaStateChange(event) {
//     const editorContentHtml = event.target.value;
//     const editorContentState = this.getEditorContentStateFromHtml(editorContentHtml);
//     this.persistChanges(editorContentHtml, EditorState.createWithContent(editorContentState));
//   }
//
//   persistChanges(editorContentHtml, editorState) {
//     this.setFormInputValue(editorContentHtml);
//     this.setState({
//       editorState: editorState,
//       textareaState: editorContentHtml
//     });
//   }
//
//   setFormInputValue(value) {
//     const {formInput} = this.props;
//     formInput.value = value;
//   }
//
//   onEditorModeSelected(editorMode) {
//     this.setState({
//       editorMode: editorMode
//     });
//   }
//
//   render() {
//     const {editorMode, editorState, textareaState} = this.state;
//     const
//       tabInactiveStyle = 'tab__button--inactive',
//       editorModeTabStyle = 'tab__button ' + (editorMode !== Wysiwyg.MODE.EDITOR ? tabInactiveStyle : ''),
//       rawModeTabStyle = 'tab__button ' + (editorMode !== Wysiwyg.MODE.RAW ? tabInactiveStyle : '');
//
//     return <div className="tabs">
//       <div className="tab__button-group">
//         <div
//           className={editorModeTabStyle}
//           onClick={this.onEditorModeSelected.bind(this, Wysiwyg.MODE.EDITOR)}>
//           {Wysiwyg.MODE.EDITOR}
//         </div>
//         <div
//           className={rawModeTabStyle}
//           onClick={this.onEditorModeSelected.bind(this, Wysiwyg.MODE.RAW)}>
//           {Wysiwyg.MODE.RAW}
//         </div>
//       </div>
//       <div className="tabs__content">
//         <div
//           className="tab__content"
//           style={{
//             display: editorMode === Wysiwyg.MODE.EDITOR ? 'block' : 'none'
//           }}>
//           <Editor
//             editorState={editorState}
//             onEditorStateChange={this.boundOnEditorStateChange}
//           />
//         </div>
//         <div
//           className="tab__content"
//           style={{
//             display: editorMode === Wysiwyg.MODE.RAW ? 'block' : 'none'
//           }}>
//           <textarea
//             className="wysiwyg__textarea"
//             onChange={this.boundOnTextareaStateChange}
//             value={textareaState}/>
//         </div>
//       </div>
//     </div>;
//   }
// }
//
export default TemplateSelector;
