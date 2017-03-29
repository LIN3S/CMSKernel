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
import {FileModel} from './../../bundle.model';

class FilePreview extends React.Component {

  static propTypes = {
    cssClass: React.PropTypes.string,
    file: React.PropTypes.instanceOf(FileModel).isRequired,
    isSelected: React.PropTypes.bool,
    onRemove: React.PropTypes.func,
    onSelected: React.PropTypes.func
  };

  static defaultProps = {
    cssClass: '',
    isSelected: false,
    onSelected: () => {}
  };

  constructor(props) {
    super(props);

    // Pre-bind methods' context
    this.boundOnRemove = this.onRemove.bind(this);
  }

  onRemove(event) {
    const {file, onRemove} = this.props;
    event.stopPropagation();
    onRemove(file);
  }

  render() {
    const {cssClass, file, isSelected, onRemove, onSelected} = this.props;
    const filePreviewCssClass = `file-preview ${cssClass} ${isSelected ? 'file-preview--selected' : ''}`;

    return <div
      className={filePreviewCssClass}
      onClick={onSelected}>
      <label className="file-preview__name">{file.id}</label>
      {onRemove !== undefined &&
      <button
        className="file-preview__delete"
        onClick={this.boundOnRemove}>✕</button>}
    </div>
  }
}

export default FilePreview;
