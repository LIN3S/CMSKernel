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
import {Tabbed, FileGallery, Alert, IconGallery, IconUpload} from './../../bundle.components';
import {getUuid} from './../../bundle.util';

import Tab from './../Tabbed/Tab';

const
  Uppy = uppy.Core,
  Dashboard = uppy.Dashboard,
  Informer = uppy.Informer,
  Multipart = uppy.Multipart;

class FileSelector extends React.Component {

  static propTypes = {
    galleryEndpoint: React.PropTypes.string.isRequired,
    galleryPageLimit: React.PropTypes.number,
    id: React.PropTypes.string.isRequired,
    mimeTypes: React.PropTypes.array.isRequired,
    onCancel: React.PropTypes.func,
    onFileSelected: React.PropTypes.func.isRequired,
    uploadEndpoint: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    galleryPageLimit: 40,
    onCancel: () => {}
  };

  uppy;
  uppyTargetClassIdentifier;

  constructor(props) {
    super(props);

    this.state = {
      isUppyInitialized: false,
      selectedTabIndex: 0,
      queryId: undefined,
      uploadResult: undefined
    };

    this.uppyTargetClassIdentifier = `uppy-${this.props.id}`;

    // Pre-bind method's context
    this.boundOnUploadStarted = this.onUploadStarted.bind(this);
    this.boundOnFileUploadError = this.onFileUploadError.bind(this);
    this.boundOnFilesUploadSuccess = this.onFilesUploadSuccess.bind(this);
    this.boundOnTabSelected = this.onTabSelected.bind(this);

    this.boundOnAlertRemove = this.onAlertRemove.bind(this);
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
    this.uppy.on('core:success', this.boundOnFilesUploadSuccess);
    this.uppy.run();

    this.setState({
      isUppyInitialized: true
    });
  }

  onUploadStarted(fileId) {
//    this.setState({
//      needsDataReload: false
//    });
  }

  onFileUploadError(fileId, xhr) {
    this.onUploadResult(false);
  }

  onFilesUploadSuccess(fileCount) {
    this.onUploadResult(true, fileCount);
  }

  onUploadResult(success, fileCount) {
    this.setState({
      selectedTabIndex: 0,
      queryId: getUuid(), // mark as new data available,
      uploadResult: {
        success: success,
        message: this.getFileUploadResultMessage(success, fileCount)
      }
    });
  }

  getFileUploadResultMessage(success, fileCount = 1) {
    // Return an associated message
    return success
      ? fileCount > 1
        ? 'Ficheros subidos correctamente.' : 'Fichero subido correctamente.'
      : 'Ha ocurrido un error al subir el fichero.';
  }

  onTabSelected(tabIndex) {
    this.setState({
      selectedTabIndex: tabIndex
    });
  }

  onAlertRemove() {
    this.setState({
      uploadResult: undefined
    });
  }

  removeUppyInputs() {
    // Hacky remove uppy input files
    const uppyInputs = document.querySelectorAll('.UppyDashboard-input');
    uppyInputs.forEach((uppyInput) => {
      uppyInput.removeAttribute('name');
    });
  }

  render() {
    const {selectedTabIndex, queryId, uploadResult} = this.state;
    const {galleryEndpoint, galleryPageLimit, onFileSelected, onCancel} = this.props;

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
            {uploadResult &&
              <Alert type={uploadResult.success ? Alert.TYPE.SUCCESS : Alert.TYPE.ERROR} message={uploadResult.message} onRemove={this.boundOnAlertRemove}/>
            }
            <FileGallery
              pageLimit={galleryPageLimit}
              queryId={queryId}
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
