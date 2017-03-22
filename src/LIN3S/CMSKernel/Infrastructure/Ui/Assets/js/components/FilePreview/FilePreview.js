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
    onSelected: React.PropTypes.func
  };

  static defaultProps = {
    cssClass: '',
    isSelected: false,
    onSelected: () => {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {cssClass, file, isSelected, onSelected} = this.props;
    const filePreviewCssClass = `file-preview ${cssClass} ${isSelected ? 'file-preview--selected' : ''}`;
    return <div
      className={filePreviewCssClass}
      onClick={onSelected}>
      {file.id}
    </div>
  }
}

export default FilePreview;
