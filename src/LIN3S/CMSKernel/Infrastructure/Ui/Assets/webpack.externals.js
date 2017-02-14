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

const
  buildExternal = (globalName, moduleName) => {
    return {
      global: globalName,
      commonjs2: moduleName,
      commonjs: moduleName,
      amd: moduleName
    }
  },
//   getWebpackExternals = () => {
//     return {
//       'react': buildExternal('React', 'react'),
//       'react-dom': buildExternal('ReactDOM', 'react-dom'),
//       'react-modal': buildExternal('Modal', 'react-modal'),
//       'lin3s-event-bus': buildExternal('lin3sEventBus', 'lin3s-event-bus'),
//       'react-draft-wysiwyg': buildExternal('reactDraftWysiwyg', 'react-draft-wysiwyg'),
//       'draft-js': buildExternal('draftJs', 'draft-js'),
//       'draftjs-to-html': buildExternal('draftjsToHtml', 'draftjs-to-html'),
//       'jquery': buildExternal('jquery', 'jquery')
//     }
//   };
  getWebpackExternals = () => {
    return {
      // module name: expected global variable
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-modal': 'Modal',
      'lin3s-event-bus': 'lin3sEventBus',
      'jquery': '$',
      'react-draft-wysiwyg': 'reactDraftWysiwyg',
      'draftjs-to-html': 'draftToHtml',
      'draft-js': 'draftJs',

      // relative to the webpack's build entry-point (js/dependencies.js)
      './components/ConfirmationModal/App': 'ConfirmationModal',
      './components/Wysiwyg/Wysiwyg': 'Wysiwyg'
    }
  };

export {buildExternal, getWebpackExternals};
