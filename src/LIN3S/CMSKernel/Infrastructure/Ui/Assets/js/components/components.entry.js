/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 * @author Beñat Espiña <benatespina@gmail.com>
 */

const
  getComponentsMap = (rootPath) => {
    return {
      'templateSelector': `${rootPath}/TemplateSelector/init.js`,
      'wysiwyg': `${rootPath}/Wysiwyg/init.js`
    };
  };

export default getComponentsMap;
