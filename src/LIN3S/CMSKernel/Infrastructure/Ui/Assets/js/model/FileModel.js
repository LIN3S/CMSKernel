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

class FileModel {

  id;
  name;
  mimeType;
  createdOn;
  updatedOn;
  previewPath;
  size;

  static TYPE = {
    IMAGE:      'IMAGE',
    IMAGE_JPG:  'IMAGE_JPG',
    IMAGE_PNG:  'IMAGE_PNG',
    IMAGE_SVG:  'IMAGE_SVG',

    VIDEO:      'VIDEO',
    VIDEO_MP4:  'VIDEO_MP4',
    VIDEO_AVI:  'VIDEO_AVI',

    AUDIO:      'AUDIO',
    AUDIO_MP3:  'AUDIO_MP3',

    PDF:        'PDF',
    DOC:        'DOC',
    XLS:        'XLS',
    PPT:        'PPT',
    TXT:        'TXT',
    RTF:        'RTF',
    ZIP:        'ZIP',

    DEFAULT:    'DEFAULT'
  };

  constructor(id, name, mimeType, createdOn, updatedOn, previewPath, size) {
    this.id = id;
    this.name = name;
    this.mimeType = mimeType;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
    this.previewPath = previewPath;
    this.size = size;
  }

  static fromJsonString(jsonStringFile) {
    return FileModel.fromJson(JSON.parse(jsonStringFile));
  }

  static fromJson(jsonFile) {
    return new FileModel(
      jsonFile['id'],
      jsonFile['file_name'],
      jsonFile['mime_type'],
      jsonFile['created_on'],
      jsonFile['updated_on'],
      jsonFile['previewPath'],
      jsonFile['size']
    );
  }

  static getTypes() {
    return Object.keys(FileModel.TYPE).map(key => FileModel.TYPE[key]);
  }

  getType() {
    if (this.mimeType === 'image/png') {
      return FileModel.TYPE.IMAGE_PNG;
    } else if (this.mimeType === 'image/jpg'
      || this.mimeType === 'image/jpeg') {
      return FileModel.TYPE.IMAGE_JPG;
    } else if (this.mimeType.startsWith('image/svg')) {
      return FileModel.TYPE.IMAGE_SVG;
    } else if (this.mimeType.startsWith('image/')) {
      return FileModel.TYPE.IMAGE;
    }

    else if (this.mimeType === 'video/mp4') {
      return FileModel.TYPE.VIDEO_MP4;
    } else if (this.mimeType === 'video/avi') {
      return FileModel.TYPE.VIDEO_AVI;
    } else if (this.mimeType.startsWith('video/')) {
      return FileModel.TYPE.VIDEO;
    }

    else if (this.mimeType === 'audio/mpeg3'
      || this.mimeType === 'audio/x-mpeg-3') {
      return FileModel.TYPE.AUDIO_MP3;
    } else if (this.mimeType.startsWith('audio/')) {
      return FileModel.TYPE.AUDIO;
    }

    else if (this.mimeType === 'application/pdf') {
      return FileModel.TYPE.PDF;
    } else if (this.mimeType.includes('msword')
      || this.mimeType.includes('ms-word')) {
      return FileModel.TYPE.DOC;
    } else if (this.mimeType.includes('excel')) {
      return FileModel.TYPE.XLS;
    } else if (this.mimeType.includes('powerpoint')) {
      return FileModel.TYPE.PPT;
    } else if (this.mimeType === 'text/plain') {
      return FileModel.TYPE.TXT;
    } else if (this.mimeType === 'application/rtf'
      || this.mimeType === 'application/x-rtf'
      || this.mimeType === 'text/richtext') {
      return FileModel.TYPE.RTF;
    } else if (this.mimeType === 'application/zip'
      || this.mimeType === 'multipart/x-zip'
      || this.mimeType === 'application/x-compressed'
      || this.mimeType === 'application/x-zip-compressed') {
      return FileModel.TYPE.ZIP;
    }

    return FileModel.TYPE.DEFAULT;
  }

}

export default FileModel;
