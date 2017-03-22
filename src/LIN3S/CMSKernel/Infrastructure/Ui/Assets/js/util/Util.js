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

import {React} from './../bundle.dependencies';

const reactPropType = (type) => {
  return React.PropTypes.shape({
    type: React.PropTypes.oneOf([type])
  })
};

const reactPropTypeInstanceOf = (PropClass) => {
  return React.PropTypes.oneOfType([reactPropType(PropClass)]);
};

const reactPropTypeArrayOf = (PropClass) => {
  return React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(reactPropType(PropClass)), // array of
    reactPropType(PropClass) // single instance
  ])
};

export {reactPropType, reactPropTypeInstanceOf, reactPropTypeArrayOf};
