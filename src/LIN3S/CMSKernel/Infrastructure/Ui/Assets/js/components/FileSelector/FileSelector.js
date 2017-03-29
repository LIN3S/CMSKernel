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

import {React, uppy} from './../../bundle.dependencies';
import {Tabbed, FileGallery, IconGallery, IconUpload} from './../../bundle.components';

import Tab from './../Tabbed/Tab';

const
  Uppy = uppy.Core,
  Dashboard = uppy.Dashboard,
  Informer = uppy.Informer,
  Multipart = uppy.Multipart;

class FileSelector extends React.Component {

  static propTypes = {
    galleryEndpoint: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    mimeTypes: React.PropTypes.array.isRequired,
    onCancel: React.PropTypes.func,
    onFileSelected: React.PropTypes.func.isRequired,
    uploadEndpoint: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    onCancel: () => {}
  };

  uppy;
  uppyTargetClassIdentifier;

  constructor(props) {
    super(props);

    this.state = {
      isUppyInitialized: false,
      selectedTabIndex: 0,
      needsDataReload: true
    };

    this.uppyTargetClassIdentifier = `uppy-${this.props.id}`;

    // Pre-bind method's context
    this.boundOnUploadStarted = this.onUploadStarted.bind(this);
    this.boundOnFileUploadSuccess = this.onFileUploadSuccess.bind(this);
    this.boundOnFileUploadError = this.onFileUploadError.bind(this);
    this.boundOnFilesUploadSuccess = this.onFilesUploadSuccess.bind(this);
    this.boundOnTabSelected = this.onTabSelected.bind(this);
  }

  componentDidMount() {
    if (this.state.isUppyInitialized) {
      return;
    }

    this.initializeUppy();
  }

  initializeUppy() {
    const {uploadEndpoint, mimeTypes} = this.props;

    this.uppy = new Uppy({autoProceed: false});
    this.uppy
      .use(Dashboard, {
        inline: true,
        target: `.${this.uppyTargetClassIdentifier}`
      })
      .use(Informer, {target: Dashboard})
      .use(Multipart, {
        endpoint: uploadEndpoint,
        resume: true,
        fieldName: 'file'
      });

    this.uppy.on('core:upload', this.boundOnUploadStarted);
    this.uppy.on('core:upload-error', this.boundOnFileUploadError);
    this.uppy.on('core:upload-success', this.boundOnFileUploadSuccess);
    this.uppy.on('core:success', this.boundOnFilesUploadSuccess);
    this.uppy.run();

    this.setState({
      isUppyInitialized: true
    });


  }

  onUploadStarted(fileId) {
    console.log('onUploadStarted');
    this.setState({
      needsDataReload: false
    });
  }

  onFileUploadSuccess(fileId, resp, uploadURL) {
    console.log(fileId, resp, uploadURL);
  }

  onFileUploadError(fileId, xhr) {
    console.log(fileId, xhr);
  }

  onFilesUploadSuccess(fileCount) {
    console.log('files uploaded!', fileCount);
    this.setState({
      selectedTabIndex: 0,
      needsDataReload: true // mark as new data available
    });
  }

  onTabSelected(tabIndex) {
    this.setState({
      selectedTabIndex: tabIndex
    });
  }

  removeUppyInputs() {
    // Hacky remove uppy input files
    const uppyInputs = document.querySelectorAll('.UppyDashboard-input');
    uppyInputs.forEach((uppyInput) => {
      console.log(uppyInput);
//       uppyInput.remove();
      uppyInput.removeAttribute('name');
      console.log(uppyInput);
    });
  }

  render() {
    const {selectedTabIndex, needsDataReload} = this.state;
    const {galleryEndpoint, onFileSelected, onCancel} = this.props;

    this.removeUppyInputs();

    return <div className="file-selector">
      <Tabbed
        onTabSelected={this.boundOnTabSelected}
        selectedTabIndex={selectedTabIndex}>
        <Tab label={
          <label className="tabbed__label-content">
            <IconGallery/>Gallery
          </label>
        }>
          <div className="file-selector__gallery-wrapper">
            <FileGallery
              needsDataReload={needsDataReload}
              endpoint={galleryEndpoint}
              onAccept={onFileSelected}
              onCancel={onCancel}/>
          </div>
        </Tab>
        <Tab label={
          <label className="tabbed__label-content">
            <IconUpload/>Upload
          </label>
        }>
          <div className={this.uppyTargetClassIdentifier}></div>
        </Tab>
      </Tabbed>
    </div>;
  }
}

export default FileSelector;
