/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikel@lin3s.com>
 */

const
  getComponentsMap = (rootPath) => {
    return {
      'confirmation-modal': `${rootPath}/ConfirmationModal/App.js`,
      'wysiwyg': `${rootPath}/Wysiwyg/Wysiwyg.js`
    };
  };

export default getComponentsMap;
