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

import {React, ReactMotion} from './../../bundle.dependencies';
import {MenuTreeItemModel} from './../../bundle.model';

import MenuTreeItemView from './MenuTreeItemView';

const
  TransitionMotion = ReactMotion.TransitionMotion;

class MenuTreeView extends React.Component {

  static propTypes = {
    menuTree: React.PropTypes.instanceOf(MenuTreeItemModel).isRequired,
    onAddMenuItem: React.PropTypes.func,
    onRemoveMenuItem: React.PropTypes.func,
    onUpdateMenuItem: React.PropTypes.func
  };

  static defaultProps = {
    onAddMenuItem: () => {},
    onRemoveMenuItem: () => {},
    onUpdateMenuItem: () => {}
  };

  renderMenuItems(menuItems, nestLevel = 0, props) {
    return menuItems.map((menuItem) => {
      let renderedItems = [];
      renderedItems.push(
        <MenuTreeItemView
          menuItemModel={menuItem}
          nestLevel={nestLevel}
          onAddMenuItem={props.onAddMenuItem}
          onRemoveMenuItem={props.onRemoveMenuItem}
          onUpdateMenuItem={props.onUpdateMenuItem}/>
      );

      if (menuItem.hasChildren()) {
        renderedItems.push(this.renderMenuItems(menuItem.children, nestLevel + 1, props));
      }

      return renderedItems;
    });
  }

  render() {
    const {menuTree, ...otherProps} = this.props;
    const renderedMenuTree = this.renderMenuItems(menuTree.children, 0, otherProps);

    return <div className="menu-tree__items">
      {renderedMenuTree}
    </div>;
  }
}

export default MenuTreeView;
