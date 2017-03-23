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

class MenuTree extends React.Component {

  static propTypes = {
    formInput: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      menuTree: this.getInitialMenuTree()
    };

    // Pre bind methods' context
    this.boundOnAddMenuItemButtonClick = this.onAddMenuItemButtonClick.bind(this);
  }

  getInitialMenuTree() {

  }

  onAddMenuItemButtonClick(event) {
    event.preventDefault();
  }

  render() {
    return <div className="menu-tree">
      <button
        className="button button--cms"
        onClick={this.boundOnAddMenuItemButtonClick}>
        Add menu item
      </button>
    </div>
  }
}

export default MenuTree;
