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
  static MENU_ITEM_NEST_DELTA_X = 20;

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
      draggingMenuItemDelta: {x: 0, y: 0}
    };

    // Pre-bind methods' context
    this.boundMenuItemWillEnter = this.menuItemWillEnter.bind(this);
    this.boundMenuItemWillLeave = this.menuItemWillLeave.bind(this);
    this.boundOnMenuItemClick = this.onMenuItemClick.bind(this);
    this.boundOnMenuItemOutsideClick = this.onMenuItemOutsideClick.bind(this);

    this.boundOnMenuItemDrag = this.onMenuItemDrag.bind(this);
    this.boundOnMenuItemDrop = this.onMenuItemDrop.bind(this);
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

  onMenuItemDrag(menuItemId, delta = {x: 0, y: 0}) {
    // Clone element
    // Remove from menuTree
    this.setState({
      draggingMenuItemId: menuItemId,
      draggingMenuItemDelta: delta
    });
  }

  onMenuItemDrop() {
    // Just animate to final position??
    // Animate deltas?

    this.setState({
      draggingMenuItemId: MenuTreeView.MENU_ITEM_SELECTED_NONE,
      draggingMenuItemDelta: {x: 0, y: 0}
    })
  }

  getMenuTreeHeight() {
    const {selectedMenuItemId} = this.state;
    const {menuTree} = this.props;

    const getTreeHeight = (rootMenuItem, accumulatedHeight = 0) => {
      return rootMenuItem.children.reduce((accumulatedHeight, menuItem) => {
        if (menuItem.hasChildren()) {
          accumulatedHeight = getTreeHeight(menuItem, accumulatedHeight);
        }

        accumulatedHeight += menuItem.id === selectedMenuItemId ? 110 : 60;

        return accumulatedHeight;
      }, accumulatedHeight);
    };

    return {
      treeHeight: spring(getTreeHeight(menuTree))
    };
  }

  getMenuItemTranslationY(menuItemId) {
    const {menuTree} = this.props;
    let done = false;

    const getItemTranslationY = (rootMenuItem, menuItemId, accumulatedTranslationY = 0) => {
      const {selectedMenuItemId} = this.state;

      return rootMenuItem.children.reduce((accumulatedHeight, menuItem) => {

        if (!done) {
          if (menuItem.id === menuItemId) {
            done = true;
          } else {
            accumulatedTranslationY += menuItem.id === selectedMenuItemId ? 110 : 60;

            if (menuItem.hasChildren()) {
              accumulatedTranslationY = getItemTranslationY(menuItem, menuItemId, accumulatedTranslationY);
            }
          }
        }

        return accumulatedTranslationY;
      }, accumulatedTranslationY);
    };

    return getItemTranslationY(menuTree, menuItemId);
  }

  getTransitionMotionMenuStyles() {
    const {menuTree} = this.props;
    const {draggingMenuItemId, draggingMenuItemDelta} = this.state;
    let flattenItems = [];

    const flattenMenuStyles = (rootMenuItem, nestLevel = 0) => {
      return rootMenuItem.children.map((menuItem) => {
        const
          draggingDelta = draggingMenuItemId === menuItem.id ? draggingMenuItemDelta : {x: 0, y: 0},
          menuItemTranslationX = nestLevel * MenuTreeView.MENU_ITEM_NEST_DELTA_X,
          menuItemTranslationY = this.getMenuItemTranslationY(menuItem.id) + draggingDelta.y,
          menuItemZIndex = draggingMenuItemId === menuItem.id ? 10 : 0;

        flattenItems.push({
          key: `menuItem-${menuItem.id}`,
          data: {
            menuItem: menuItem,
            finalStyle: {
              translateX: menuItemTranslationX,
              translateY: menuItemTranslationY
            }
          },
          style: {
            opacity: spring(1),
            translateX: spring(menuItemTranslationX),
            translateY: spring(menuItemTranslationY),
            zIndex: menuItemZIndex
          }
        });

        if (menuItem.hasChildren()) {
          flattenMenuStyles(menuItem, nestLevel + 1);
        }

        return flattenItems;
      });
    };

    flattenMenuStyles(menuTree);
    return flattenItems;
  }

  menuItemWillEnter({data}) {
    return {
      opacity: 0,
      translateX: data.finalStyle.translateX,
      translateY: data.finalStyle.translateY -20,
      zIndex: 0
    };
  }

  menuItemWillLeave({data}) {
    return {
      opacity: spring(0),
      translateX: data.finalStyle.translateX,
      translateY: spring(data.finalStyle.translateY -20),
      zIndex: 0
    };
  }

  render() {
    const {onAddMenuItem, onRemoveMenuItem, onUpdateMenuItem} = this.props;
    const {selectedMenuItemId} = this.state;
    const
      menuTreeHeight = this.getMenuTreeHeight(),
      menuTreeStyles = this.getTransitionMotionMenuStyles();

    return <TransitionMotion
      styles={menuTreeStyles}
      willEnter={this.boundMenuItemWillEnter}
      willLeave={this.boundMenuItemWillLeave}>
        {(interpolatedStyles) =>
          <Motion style={menuTreeHeight}>
            {({treeHeight}) =>
              <div
                className="menu-tree__items"
                style={{
                  height: `${treeHeight}px`
                }}>
                {interpolatedStyles.map(({key, data, style}) => {
                  const {opacity, translateX, translateY, zIndex} = style;
                  const {menuItem} = data;
                  const outsideClickHandler = menuItem.id === selectedMenuItemId
                      ? this.boundOnMenuItemOutsideClick
                      : () => {};

                  return <div
                    key={key}
                    style={{
                      left: 0,
                      opacity: opacity,
                      position: 'absolute',
                      top: 0,
                      transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                      zIndex: zIndex
                    }}>
                      <MenuTreeItemView
                        isSelected={menuItem.id === selectedMenuItemId}
                        menuItemModel={menuItem}
                        onAddMenuItem={onAddMenuItem}
                        onClick={this.boundOnMenuItemClick}
                        onDrag={this.boundOnMenuItemDrag}
                        onDrop={this.boundOnMenuItemDrop}
                        onOutsideClick={outsideClickHandler}
                        onRemoveMenuItem={onRemoveMenuItem}
                        onUpdateMenuItem={onUpdateMenuItem}/>
                    </div>;
                })}
              </div>}
          </Motion>
        }
    </TransitionMotion>;
  }
}

export default MenuTreeView;
