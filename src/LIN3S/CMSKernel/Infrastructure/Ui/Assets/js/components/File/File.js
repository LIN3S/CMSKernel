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

import {React} from './../../bundle.dependencies';
import {FullScreenModal, FileSelector, FilePreview} from './../../bundle.components';
import {FileModel} from './../../bundle.model';

class File extends React.Component {

  static propTypes = {
    formInput: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      fileSelectorModalIsOpened: false,
      selectedFile: this.getInitialFile()
    };

    console.log('File', this.state.selectedFile);

    // Pre-bind method's context
    this.boundOnFileSelectButtonClick = this.onFileSelectButtonClick.bind(this);
    this.boundOnModalClose = this.onModalClose.bind(this);
    this.boundOnFileSelected = this.onFileSelected.bind(this);
    this.boundOnFileRemoveButtonClick = this.onFileRemove.bind(this);
  }

  getInitialFile() {
    const fileJson = this.getFormInputAttribute('data-preview');
    if (fileJson === '') {
      return undefined;
    }

    return FileModel.fromJsonString(fileJson);
  }

  setFormInputValue(value) {
    const {formInput} = this.props;
    formInput.value = value;
  }

  getFormInputAttribute(attributeName) {
    const {formInput} = this.props;
    return formInput.getAttribute(attributeName);
  }

  getArrayFromJsonString(jsonString) {
    return JSON.parse(jsonString);
  }

  onModalClose() {
    this.setState({
      fileSelectorModalIsOpened: false
    });
  }

  onFileSelectButtonClick(event) {
    event.preventDefault();

    this.setState({
      fileSelectorModalIsOpened: true
    });
  }

  onFileSelected(file) {
    this.setFormInputValue(file.id);
    this.setState({
      fileSelectorModalIsOpened: false,
      selectedFile: file
    });
  }

  onFileRemove(file) {
    this.setFormInputValue(null);
    this.setState({
      fileSelectorModalIsOpened: false,
      selectedFile: undefined
    });
  }

  render() {
    const {formInput} = this.props;
    const {fileSelectorModalIsOpened, selectedFile} = this.state;

    return <div className="file__wrapper">
      {selectedFile === undefined &&
      <button
        className="button file__select"
        onClick={this.boundOnFileSelectButtonClick}>
        Select
      </button>}

      {selectedFile !== undefined &&
      <FilePreview
        cssClass="file-preview--current"
        file={selectedFile}
        onSelected={this.boundOnFileSelectButtonClick}
        onRemove={this.boundOnFileRemoveButtonClick}/>}

      <FullScreenModal isOpened={fileSelectorModalIsOpened} onClickOutside={this.boundOnModalClose}>
        <FileSelector
          galleryEndpoint={this.getFormInputAttribute('data-gallery-endpoint')}
          id={formInput.id}
          mimeTypes={this.getArrayFromJsonString(this.getFormInputAttribute('data-mime-types'))}
          onCancel={this.boundOnModalClose}
          onFileSelected={this.boundOnFileSelected}
          uploadEndpoint={this.getFormInputAttribute('data-upload-endpoint')}/>
      </FullScreenModal>
    </div>
  }
}

export default File;
