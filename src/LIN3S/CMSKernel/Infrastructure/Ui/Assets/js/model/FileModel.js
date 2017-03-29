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
  size;

  constructor(id, name, mimeType, createdOn, updatedOn, size) {
    this.id = id;
    this.name = name;
    this.mimeType = mimeType;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
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
      jsonFile['size']
    );
  }
}

export default FileModel;
