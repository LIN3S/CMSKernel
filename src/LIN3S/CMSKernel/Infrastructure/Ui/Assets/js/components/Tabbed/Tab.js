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

class Tab extends React.Component {

  static propTypes = {
    label: React.PropTypes.element,
    children: React.PropTypes.element.isRequired // Single content child
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {children} = this.props;

    return <div className="tab">{children}</div>
  }

}

export default Tab;
