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
import {
  IconFileTypeAudio,
  IconFileTypeImage,
  IconFileTypeVideo,
  IconFileTypePdf,
  IconFileTypeDoc,
  IconFileTypeXls,
  IconFileTypePpt,
  IconFileTypeTxt,
  IconFileTypeRtf,
  IconFileTypeZip,
  IconFileTypeDefault
} from './../../bundle.components';
import {reactPropTypeOneOf} from './../../bundle.util';
import {FileModel} from './../../bundle.model';

class IconFileType extends React.Component {

  static propTypes = {
    cssClass: React.PropTypes.string,
    type: reactPropTypeOneOf('type', FileModel.getTypes())
  };

  static defaultProps = {
    cssClass: 'icon--file',
    type: FileModel.TYPE.DEFAULT
  };

  getTypeIcon() {
    const {cssClass, type} = this.props;
    const iconCssClass = `icon ${cssClass}`;

    switch (type) {
      case FileModel.TYPE.IMAGE_JPG:
      case FileModel.TYPE.IMAGE_PNG:
      case FileModel.TYPE.IMAGE_SVG:
      case FileModel.TYPE.IMAGE:
        return <IconFileTypeImage cssClass={iconCssClass} type={type}/>;

      case FileModel.TYPE.VIDEO_MP4:
      case FileModel.TYPE.VIDEO_AVI:
      case FileModel.TYPE.VIDEO:
        return <IconFileTypeVideo cssClass={iconCssClass} type={type}/>;

      case FileModel.TYPE.AUDIO_MP3:
      case FileModel.TYPE.AUDIO:
        return <IconFileTypeAudio cssClass={iconCssClass} type={type}/>;

      case FileModel.TYPE.PDF:
        return <IconFileTypePdf cssClass={iconCssClass}/>;
      case FileModel.TYPE.DOC:
        return <IconFileTypeDoc cssClass={iconCssClass}/>;
      case FileModel.TYPE.XLS:
        return <IconFileTypeXls cssClass={iconCssClass}/>;
      case FileModel.TYPE.PPT:
        return <IconFileTypePpt cssClass={iconCssClass}/>;
      case FileModel.TYPE.TXT:
        return <IconFileTypeTxt cssClass={iconCssClass}/>;
      case FileModel.TYPE.RTF:
        return <IconFileTypeRtf cssClass={iconCssClass}/>;
      case FileModel.TYPE.ZIP:
        return <IconFileTypeZip cssClass={iconCssClass}/>;

      default:
        return <IconFileTypeDefault cssClass={iconCssClass}/>;
    }
  }

  render() {
    return this.getTypeIcon();
  }

}

export default IconFileType;
