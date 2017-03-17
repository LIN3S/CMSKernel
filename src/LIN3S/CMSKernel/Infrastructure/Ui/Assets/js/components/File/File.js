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
import {FullScreenModal, FileSelector} from './../../bundle.components';

class File extends React.Component {

  static propTypes = {
    formInput: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      fileSelectorModalIsOpened: false
    };

    // Pre-bind method's context
    this.boundOnFileSelectButtonClick = this.onFileSelectButtonClick.bind(this);
    this.boundOnModalOutsideClick = this.onModalOutsideClick.bind(this);
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

  onModalOutsideClick() {
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

  render() {
    const {formInput} = this.props;
    const {fileSelectorModalIsOpened} = this.state;

    return <div className="file__wrapper">
      <button
        className="file__select"
        onClick={this.boundOnFileSelectButtonClick}>
        Select
      </button>
      <FullScreenModal isOpened={fileSelectorModalIsOpened} onClickOutside={this.boundOnModalOutsideClick}>
        <FileSelector
          galleryEndpoint={this.getFormInputAttribute('data-gallery-endpoint')}
          id={formInput.id}
          mimeTypes={this.getArrayFromJsonString(this.getFormInputAttribute('data-mime-types'))}
          uploadEndpoint={this.getFormInputAttribute('data-upload-endpoint')}/>
      </FullScreenModal>
    </div>
  }
}

export default File;
