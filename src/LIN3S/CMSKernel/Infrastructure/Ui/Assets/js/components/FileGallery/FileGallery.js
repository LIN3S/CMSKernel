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

import {React, CancelablePromise as makeCancelable} from './../../bundle.dependencies';
import {FilePreview} from './../../bundle.components';

class FileGallery extends React.Component {

  static propTypes = {
    needsDataReload: React.PropTypes.bool,
    endpoint: React.PropTypes.string.isRequired,
    onAccept: React.PropTypes.func,
    onCancel: React.PropTypes.func
  };

  static defaultProps = {
    onAccept: () => {},
    onCancel: () => {}
  };

  mainPromise;

  constructor(props) {
    super(props);

    this.state = {
      files: [],
      selectedFile: undefined
    };

    // Pre-bind methods' context
    this.boundOnAccept = this.onAccept.bind(this);
    this.boundOnCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    if (!this.props.needsDataReload) {
      return;
    }

    this.fetchFiles();
  }

  componentWillUnmount() {
    // Cancel fetch promise
    this.mainPromise.cancel();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needsDataReload !== this.props.needsDataReload && nextProps.needsDataReload) {
      // Reload data
      this.fetchFiles();
    }
  }

  fetchFiles() {
    // fetch files from server
    const {endpoint} = this.props;

    this.mainPromise = makeCancelable(
      new Promise((resolve, reject) => {
        fetch(
          endpoint,
          {method: 'GET'}
        )
          .then(response => response.json())
          .then((json) => {
            resolve(json);
          })
          .catch((ex) => {
            reject(ex);
          });
      })
    );

    this.mainPromise.promise.then((files) => {
      this.setState({
        files: files
      });
    });
  }

  onFileSelected(file) {
    this.setState({
      selectedFile: file
    });
  }

  onAccept(event) {
    event.preventDefault();
    const {onAccept} = this.props;
    onAccept(this.state.selectedFile);
  }

  onCancel(event) {
    event.preventDefault();
    // Remove selection
    this.setState({
      selectedFile: undefined
    });

    const {onCancel} = this.props;
    onCancel();
  }

  render() {
    const {files, selectedFile} = this.state;

    return <div className="file-gallery">
      <div className="file-gallery__files-wrapper">
        {files.map((file) =>
          <div
            className="file-gallery__file-wrapper"
            key={`file-${file.id}`}>
            <FilePreview
              file={file}
              onSelected={this.onFileSelected.bind(this, file)}
              isSelected={file === selectedFile}/>
          </div>
        )}
      </div>
      <div className="file-gallery__controls">
        <button
          className="button"
          onClick={this.boundOnCancel}>
          Cancelar
        </button>
        {selectedFile !== undefined &&
        <button
          className="button"
          onClick={this.boundOnAccept}>
          Aceptar
        </button>}
      </div>
    </div>;
  }
}

export default FileGallery;
