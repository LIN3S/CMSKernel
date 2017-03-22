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

class FileVO {

  id;
  name;
  mimeType;
  createdAt;
  updatedAt;
  size;

  constructor(id, name, mimeType, createdAt, updatedAt, size) {
    this.id = id;
    this.name = name;
    this.mimeType = mimeType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.size = size;
  }

  static fromJson(jsonFile) {



  }

}

export default FileVO;
