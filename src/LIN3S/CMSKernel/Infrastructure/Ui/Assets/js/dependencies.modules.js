/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikel@lin3s.com>
 */

// import {listenDomReady, listenDomLoaded, onDomReady} from 'lin3s-event-bus';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
// import {Editor} from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import {ContentState, EditorState, convertFromHTML, convertToRaw} from 'draft-js';
// import $ from 'jquery';
//
// export {
//   listenDomReady,
//   listenDomLoaded,
//   onDomReady,
//   React,
//   ReactDOM,
//   Modal,
//   Editor,
//   draftToHtml,
//   ContentState,
//   EditorState,
//   convertFromHTML,
//   convertToRaw,
//   $
// }


import * as lin3sEventBus from 'lin3s-event-bus';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import * as reactDraftWysiwyg from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import * as draftJs from 'draft-js';
import $ from 'jquery';

import ConfirmationModal from './components/ConfirmationModal/App';
import Wysiwyg from './components/Wysiwyg/Wysiwyg';

export {
  lin3sEventBus,
  React,
  ReactDOM,
  Modal,
  reactDraftWysiwyg,
  draftToHtml,
  draftJs,
  $,
  ConfirmationModal,
  Wysiwyg
}
