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
  Motion = ReactMotion.Motion,
  spring = ReactMotion.spring,
  TransitionMotion = ReactMotion.TransitionMotion;

class MenuTreeView extends React.Component {

  static MENU_ITEM_SELECTED_NONE = -1;

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

  constructor(props) {
    super(props);

    this.state = {
      selectedMenuItemId: MenuTreeView.MENU_ITEM_SELECTED_NONE,
      draggingMenuItemId: MenuTreeView.MENU_ITEM_SELECTED_NONE,
      droppingMenuItemId: MenuTreeView.MENU_ITEM_SELECTED_NONE
    };

    // Pre-bind methods' context
    this.boundOnMenuItemClick = this.onMenuItemClick.bind(this);
    this.boundOnMenuItemOutsideClick = this.onMenuItemOutsideClick.bind(this);
  }

  onMenuItemClick(menuItemId) {
    this.setState({
      selectedMenuItemId: menuItemId
    });
  }

  onMenuItemOutsideClick() {
    this.setState({
      selectedMenuItemId: MenuTreeView.MENU_ITEM_SELECTED_NONE
    });
  }

  reduceMenuTreeHeight(rootMenuItem, accumulatedHeight = 0) {
    const {selectedMenuItemId} = this.state;

    return rootMenuItem.children.reduce((accumulatedHeight, menuItem) => {
      if (menuItem.hasChildren()) {
        accumulatedHeight = this.reduceMenuTreeHeight(menuItem, accumulatedHeight);
      }

      accumulatedHeight += menuItem.id === selectedMenuItemId ? 110 : 60;

      return accumulatedHeight;
    }, accumulatedHeight);
  }

  reduceMenuItemTranslationY(rootMenuItem, menuItemId) {
    let done = false;

    const reduceItemTranslationY = (rootMenuItem, menuItemId, accumulatedTranslationY = 0) => {
      const {selectedMenuItemId} = this.state;

      return rootMenuItem.children.reduce((accumulatedHeight, menuItem) => {

        if (!done) {
          if (menuItem.id === menuItemId) {
            done = true;
          } else {
            accumulatedTranslationY += menuItem.id === selectedMenuItemId ? 110 : 60;

            if (menuItem.hasChildren()) {
              accumulatedTranslationY = reduceItemTranslationY(menuItem, menuItemId, accumulatedTranslationY);
            }
          }
        }

        return accumulatedTranslationY;
      }, accumulatedTranslationY);
    };

    return reduceItemTranslationY(rootMenuItem, menuItemId);
  }

  renderMenuItems(rootMenuItem, nestLevel = 0, props) {
    const {selectedMenuItemId} = this.state;
    const {menuTree} = this.props;

    return rootMenuItem.children.map((menuItem) => {
      let renderedItems = [];
      const
        outsideClickHandler = menuItem.id === selectedMenuItemId
          ? this.boundOnMenuItemOutsideClick
          : () => {},
        menuItemTranslationY = this.reduceMenuItemTranslationY(menuTree, menuItem.id),
        menuItemStyle = {
          translateY: spring(menuItemTranslationY)
        };

      renderedItems.push(
        <Motion style={menuItemStyle}>
          {({translateY}) =>
            <div style={{
              left: 0,
              position: 'absolute',
              top: 0,
              transform: `translateX(${nestLevel * 20}px) translateY(${translateY}px)`
            }}>
              <MenuTreeItemView
                isSelected={menuItem.id === selectedMenuItemId}
                menuItemModel={menuItem}
                onAddMenuItem={props.onAddMenuItem}
                onClick={this.boundOnMenuItemClick}
                onOutsideClick={outsideClickHandler}
                onRemoveMenuItem={props.onRemoveMenuItem}
                onUpdateMenuItem={props.onUpdateMenuItem}/>
            </div>}
        </Motion>
      );

      if (menuItem.hasChildren()) {
        renderedItems.push(this.renderMenuItems(menuItem, nestLevel + 1, props));
      }

      return renderedItems;
    });
  }

  render() {
    const {menuTree, ...otherProps} = this.props;
    const
      renderedMenuTree = this.renderMenuItems(menuTree, 0, otherProps),
      menuTreeHeight = this.reduceMenuTreeHeight(menuTree);

    return <div
      className="menu-tree__items"
      style={{
        height: `${menuTreeHeight}px`
      }}>
      {renderedMenuTree}
    </div>;
  }
}

export default MenuTreeView;
