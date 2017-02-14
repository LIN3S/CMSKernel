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
  getOutputPath = () => {
    return './../../../Symfony/Bundle/Resources/public/';
  },
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

      // relative to the webpack's build entry-point (js/bundle.js)
      './components/ConfirmationModal/App': 'ConfirmationModal',
      './components/Wysiwyg/Wysiwyg': 'Wysiwyg'
    }
  };

export {getOutputPath, getWebpackExternals};
