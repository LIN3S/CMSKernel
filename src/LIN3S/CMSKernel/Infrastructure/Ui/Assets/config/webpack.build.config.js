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

const
  getOutputPath = () => {
    return './../../../Symfony/Bundle/Resources/public/';
  },
  getWebpackExternals = () => {
    return {
      // module name: expected global variable

      'react':                                            'React',
      'react-dom':                                        'ReactDOM',
      'react-motion':                                     'ReactMotion',
      'react-modal':                                      'Modal',
      'lin3s-event-bus':                                  'lin3sEventBus',
      'jquery':                                           '$',
      'react-draft-wysiwyg':                              'reactDraftWysiwyg',
      'draftjs-to-html':                                  'draftToHtml',
      'draft-js':                                         'draftJs',
      'uppy':                                             'uppy',
      'react-dates':                                      'ReactDates',
      'moment':                                           'moment',
      'lodash.debounce':                                  'debounce',
      'react-js-pagination':                              'Pagination',

      // relative to the webpack's build entry-point (js/bundle.js)

      './components/Tabbed/Tabbed':                       'Tabbed',
      './components/ConfirmationModal/App':               'ConfirmationModal',
      './components/TemplateSelector/TemplateSelector':   'TemplateSelector',
      './components/FileSelector/FileSelector':           'FileSelector',
      './components/FullScreenModal/FullScreenModal':     'FullScreenModal',
      './components/Wysiwyg/Wysiwyg':                     'Wysiwyg',
      './components/FileGallery/FileGallery':             'FileGallery',
      './components/File/File':                           'File',
      './components/FilePreview/FilePreview':             'FilePreview',
      './components/WithOutsideClick/WithOutsideClick':   'WithOutsideClick',
      './components/MenuTree/MenuTree':                   'MenuTree',
      './components/EditableLabel/EditableLabel':         'EditableLabel',
      './components/Alert/Alert':                         'Alert',
      './components/DatePicker/DatePicker':               'DatePicker',
      './components/SearchBox/SearchBox':                 'SearchBox',
      './components/Loader/Loader':                       'Loader',
      './components/Icon/IconAdd':                        'IconAdd',
      './components/Icon/IconRemove':                     'IconRemove',
      './components/Icon/IconUpload':                     'IconUpload',
      './components/Icon/IconGallery':                    'IconGallery',
      './components/Icon/IconTextEditor':                 'IconTextEditor',
      './components/Icon/IconRawEditor':                  'IconRawEditor',
      './components/Icon/IconMove':                       'IconMove',
      './components/Icon/IconSearch':                      'IconSearch',
      './components/Icon/IconFileType':                   'IconFileType',
      './components/Icon/FileType/IconFileTypeAudio':     'IconFileTypeAudio',
      './components/Icon/FileType/IconFileTypeImage':     'IconFileTypeImage',
      './components/Icon/FileType/IconFileTypeVideo':     'IconFileTypeVideo',
      './components/Icon/FileType/IconFileTypePdf':       'IconFileTypePdf',
      './components/Icon/FileType/IconFileTypeDoc':       'IconFileTypeDoc',
      './components/Icon/FileType/IconFileTypeXls':       'IconFileTypeXls',
      './components/Icon/FileType/IconFileTypePpt':       'IconFileTypePpt',
      './components/Icon/FileType/IconFileTypeTxt':       'IconFileTypeTxt',
      './components/Icon/FileType/IconFileTypeRtf':       'IconFileTypeRtf',
      './components/Icon/FileType/IconFileTypeZip':       'IconFileTypeZip',
      './components/Icon/FileType/IconFileTypeDefault':   'IconFileTypeDefault',

      './model/model/FileModel':                          'FileModel',
      './model/model/MenuTreeItemModel':                  'MenuTreeItemModel',

      './util/Util':                                      'Util',

      './observer/NodeAddedObserver':                     'NodeAddedObserver',
      './observer/NodeAddedEvent':                        'NodeAddedEvent',
      './observer/NodeAddedEventSubscriber':              'NodeAddedEventSubscriber'
    }
  };

export {getOutputPath, getWebpackExternals};
