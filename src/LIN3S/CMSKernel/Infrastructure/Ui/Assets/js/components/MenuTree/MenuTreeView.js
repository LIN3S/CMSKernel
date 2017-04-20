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
import MenuTreePlaceholderView from './MenuTreePlaceholderView';

const
  Motion = ReactMotion.Motion,
  spring = ReactMotion.spring,
  TransitionMotion = ReactMotion.TransitionMotion;

class MenuTreeView extends React.Component {

  static MENU_ITEM_SELECTED_NONE = -1;
  static MENU_ITEM_HEIGHT = 50;
  static MENU_ITEM_MARGIN_Y = 10;
  static MENU_ITEM_NEST_DELTA_X = 20;

  static propTypes = {
    menuTree: React.PropTypes.instanceOf(MenuTreeItemModel).isRequired,
    onAddMenuItem: React.PropTypes.func,
    onMoveMenuItem: React.PropTypes.func,
    onRemoveMenuItem: React.PropTypes.func,
    onUpdateMenuItem: React.PropTypes.func
  };

  static defaultProps = {
    onAddMenuItem: () => {},
    onMoveMenuItem: () => {},
    onRemoveMenuItem: () => {},
    onUpdateMenuItem: () => {}
  };


  needsCacheUpdate = true;
  cachedFlattenedMenuStyles; // Cached for performance reasons
  cachedMenuTreeHeight; // Cached for performance reasons

  isDraggingAMenuItem = false;
  draggingMenuItemData = {
    x: undefined,
    y: undefined,
    pageX: undefined,
    pageY: undefined
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedMenuItemId: MenuTreeView.MENU_ITEM_SELECTED_NONE,
      draggingMenuItem: undefined,
      draggingMenuItemPosition: {x: 0, y: 0}
    };

    // Pre-bind methods' context
    this.boundMenuItemWillEnter = this.menuItemWillEnter.bind(this);
    this.boundMenuItemWillLeave = this.menuItemWillLeave.bind(this);
    this.boundOnMenuItemClick = this.onMenuItemClick.bind(this);
    this.boundOnMenuItemOutsideClick = this.onMenuItemOutsideClick.bind(this);

    // Drag/drop
    this.boundOnMenuItemDragStart = this.onMenuItemDragStart.bind(this);
    this.boundOnMouseMove = this.onMouseMove.bind(this);
    this.boundOnMouseUp = this.onMouseUp.bind(this);
    this.boundOnMenuItemDropMotionRest = this.onMenuItemDropMotionRest.bind(this);
  }

  componentWillUnmount() {
    this.toggleMouseMoveEventListener(false);
  }

  componentWillReceiveProps(nextProps) {
    this.needsCacheUpdate = this.props.menuTree !== nextProps.menuTree;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.menuTree !== this.props.menuTree
        || nextState.selectedMenuItemId !== this.state.selectedMenuItemId
        || nextState.draggingMenuItem !== this.state.draggingMenuItem
        || nextState.draggingMenuItemPosition !== this.state.draggingMenuItemPosition;
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

  onMenuItemDragStart(menuItemId, {pageX, pageY}) {
    const {menuTree} = this.props;

    this.isDraggingAMenuItem = true;
    this.draggingMenuItemData.pageX = pageX;
    this.draggingMenuItemData.pageY = pageY;

    this.updateDraggingMenuItemDataPosition(menuItemId);
    this.toggleMouseMoveEventListener();

    this.setState({
      draggingMenuItem: MenuTreeItemModel.clone(menuTree, menuItemId),
      draggingMenuItemPosition: {
        x: this.draggingMenuItemData.x,
        y: this.draggingMenuItemData.y
      }
    });
  }

  onMenuItemDrop() {
    const {draggingMenuItem} = this.state;
    this.isDraggingAMenuItem = false;
    this.updateDraggingMenuItemDataPosition(draggingMenuItem.id);
    this.setState({
      draggingMenuItemPosition: {
        x: this.draggingMenuItemData.x,
        y: this.draggingMenuItemData.y
      }
    });
  }

  onMouseMove({pageX, pageY}) {
    const {onMoveMenuItem} = this.props;
    const {draggingMenuItem} = this.state;
    const
      x = this.draggingMenuItemData.x + (pageX - this.draggingMenuItemData.pageX),
      y = this.draggingMenuItemData.y + (pageY - this.draggingMenuItemData.pageY),
      {parentMenuItemId, index} = this.getParentIdAndChildIndexByDragPosition(x, y);

    if (parentMenuItemId !== draggingMenuItem.id) {
      onMoveMenuItem(draggingMenuItem.id, parentMenuItemId, index);
    }

    this.setState({
      draggingMenuItemPosition: {
        x: x,
        y: y
      }
    });
  }

  onMouseUp() {
    this.toggleMouseMoveEventListener(false);
    this.onMenuItemDrop();
  }

  getParentIdAndChildIndexByDragPosition(x, y) {
    const {menuTree} = this.props;
    const {draggingMenuItem} = this.state;
    let
      done = false,
      parentId = menuTree.id,
      index = menuTree.children.length,
      draggingItemPassed = false;

    const findParentIdAndChildIndex = (rootMenuItem, prevMenuItem = rootMenuItem, parentMenuItem = rootMenuItem, parentMenuItemIndex = 0, accumulatedY = 0) => {
      return rootMenuItem.children.reduce((accumulatedY, menuItem, menuItemIndex) => {
        if (!done) {
          // Skip dragging item's children
          const
            isDraggingItem = draggingMenuItem.id === menuItem.id,
            isDraggingItemsChild = MenuTreeItemModel.find(draggingMenuItem, menuItem.id) !== undefined && !isDraggingItem;

          draggingItemPassed = draggingItemPassed || isDraggingItem;

          if (!isDraggingItemsChild) {
            accumulatedY += MenuTreeView.MENU_ITEM_HEIGHT + MenuTreeView.MENU_ITEM_MARGIN_Y;
          }

          if (accumulatedY >= (y + MenuTreeView.MENU_ITEM_HEIGHT / 2)) {
            const
              menuItemStyle = this.cachedFlattenedMenuStyles.find(menuItemStyle => menuItemStyle.key === `menuItem-${menuItem.id}`),
              isPositiveNested = x >= menuItemStyle.data.finalStyle.translateX + MenuTreeView.MENU_ITEM_NEST_DELTA_X,
              isNegativeNested = x <= menuItemStyle.data.finalStyle.translateX - MenuTreeView.MENU_ITEM_NEST_DELTA_X,
              canBeChild = menuItem.hasChildren() && draggingItemPassed;

            index = menuItemIndex;
            parentId = rootMenuItem.id;

            if (canBeChild) {
              index = 0;
              parentId = menuItem.id;
            } else if (isPositiveNested && isDraggingItem) {
              index = 0;
              parentId = prevMenuItem.id;
            } else if (isNegativeNested && isDraggingItem) {
              index = parentMenuItemIndex;
              parentId = parentMenuItem.id;
            }

            done = true;
          } else {
            if (!isDraggingItemsChild && menuItem.hasChildren()) {
              accumulatedY = findParentIdAndChildIndex(menuItem, menuItem, rootMenuItem, menuItemIndex, accumulatedY);
            }
          }

          prevMenuItem = menuItem;
        }

        return accumulatedY;
      }, accumulatedY);
    };

    findParentIdAndChildIndex(menuTree);

    return {
      parentMenuItemId: parentId,
      index: index
    };
  }

  updateDraggingMenuItemDataPosition(draggingMenuItemId) {
    const draggingMenuItemStyle = this.cachedFlattenedMenuStyles.find(style => style.key === `menuItem-${draggingMenuItemId}`);
    this.draggingMenuItemData.x = draggingMenuItemStyle.data.finalStyle.translateX;
    this.draggingMenuItemData.y = draggingMenuItemStyle.data.finalStyle.translateY;
  }

  onMenuItemDropMotionRest() {
    if (this.isDraggingAMenuItem) {
      return;
    }

    this.setState({
      draggingMenuItem: undefined
    });
  }

  toggleMouseMoveEventListener(bind = true) {
    if (bind) {
      window.addEventListener('mousemove', this.boundOnMouseMove);
      window.addEventListener('mouseup', this.boundOnMouseUp);
    } else {
      window.removeEventListener('mousemove', this.boundOnMouseMove);
      window.removeEventListener('mouseup', this.boundOnMouseUp);
    }
  }

  getMenuTreeHeight() {
    if (this.needsCacheUpdate) {
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

      this.cachedMenuTreeHeight = getTreeHeight(menuTree);
    }

    return {
      treeHeight: spring(this.cachedMenuTreeHeight)
    };
  }

  getMenuItemTranslationY(menuItemId) {
    const {menuTree} = this.props;
    let done = false;

    const getItemTranslationY = (rootMenuItem, menuItemId, accumulatedTranslationY = 0) => {
      const {selectedMenuItemId} = this.state;

      return rootMenuItem.children.reduce((accumulatedTranslationY, menuItem) => {

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
    if (this.needsCacheUpdate) {
      const {menuTree} = this.props;
      let flattenedItems = [];

      const flattenMenuStyles = (rootMenuItem, nestLevel = 0) => {
        return rootMenuItem.children.map((menuItem) => {
          const
            menuItemTranslationX = nestLevel * MenuTreeView.MENU_ITEM_NEST_DELTA_X,
            menuItemTranslationY = this.getMenuItemTranslationY(menuItem.id);

          flattenedItems.push({
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
              translateY: spring(menuItemTranslationY)
            }
          });

          if (menuItem.hasChildren()) {
            flattenMenuStyles(menuItem, nestLevel + 1);
          }
        });
      };

      flattenMenuStyles(menuTree);

      this.cachedFlattenedMenuStyles = flattenedItems;
    }

    return this.cachedFlattenedMenuStyles;
  }

  menuItemWillEnter({data}) {
    return {
      opacity: 0,
      translateX: data.finalStyle.translateX,
      translateY: data.finalStyle.translateY -20
    };
  }

  menuItemWillLeave({data}) {
    return {
      opacity: spring(0),
      translateX: data.finalStyle.translateX,
      translateY: spring(data.finalStyle.translateY -20)
    };
  }

  getDraggingMenuItemStyle() {
    const {draggingMenuItemPosition} = this.state;
    const opacity = this.isDraggingAMenuItem ? 1 : 0;
    return {
      opacity: spring(opacity),
      translateX: spring(draggingMenuItemPosition.x),
      translateY: spring(draggingMenuItemPosition.y)
    };
  }

  render() {
    const {onAddMenuItem, onRemoveMenuItem, onUpdateMenuItem} = this.props;
    const {selectedMenuItemId, draggingMenuItem} = this.state;
    const
      menuTreeHeight = this.getMenuTreeHeight(),
      menuTreeStyles = this.getTransitionMotionMenuStyles(),
      draggingMenuItemStyle = this.getDraggingMenuItemStyle();

    return <div className="menu-tree__wrapper">
      {draggingMenuItem !== undefined &&
        <Motion style={draggingMenuItemStyle} onRest={this.boundOnMenuItemDropMotionRest}>
          {({opacity, translateX, translateY}) =>
            <div
              className="menu-tree__item-placeholder-wrapper"
              style={{
                opacity: opacity,
                transform: `translate3d(${translateX}px, ${translateY}px, 0)`
              }}>
              <MenuTreePlaceholderView menuItemModel={draggingMenuItem}/>
            </div>
          }
        </Motion>}
      <TransitionMotion
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
                    const {opacity, translateX, translateY} = style;
                    const {menuItem} = data;
                    const
                      isBeingDragged = draggingMenuItem !== undefined && MenuTreeItemModel.find(draggingMenuItem, menuItem.id) !== undefined && this.isDraggingAMenuItem,
                      isSelected = menuItem.id === selectedMenuItemId,
                      outsideClickHandler = isSelected ? this.boundOnMenuItemOutsideClick : () => {};

                    return <div
                      className="menu-tree__item-view-wrapper"
                      key={key}
                      style={{
                        opacity: opacity,
                        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                        zIndex: isBeingDragged ? 0 : 10
                      }}>
                        <MenuTreeItemView
                          isBeingDragged={isBeingDragged}
                          isSelected={isSelected}
                          menuItemModel={menuItem}
                          onAddMenuItem={onAddMenuItem}
                          onClick={this.boundOnMenuItemClick}
                          onDragStart={this.boundOnMenuItemDragStart}
                          onOutsideClick={outsideClickHandler}
                          onRemoveMenuItem={onRemoveMenuItem}
                          onUpdateMenuItem={onUpdateMenuItem}/>
                      </div>;
                  })}
                </div>}
            </Motion>
          }
      </TransitionMotion>
    </div>;
  }
}

export default MenuTreeView;
