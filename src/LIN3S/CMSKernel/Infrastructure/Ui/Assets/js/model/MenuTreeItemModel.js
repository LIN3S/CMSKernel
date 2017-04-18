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

let _uuid = 0;
const getNextUuid = () => {
  return _uuid++;
};

class MenuTreeItemModel {

  static MENU_TREE_ROOT_ID = 'MENU_TREE_ROOT_ID';

  id;
  label;
  url;
  children = [];

  constructor(children = [], label = 'Menu item label', url = '/', id = getNextUuid()) {
    this.id = id;
    this.label = label;
    this.url = url;
    this.children = children;
  }

  static fromJson(jsonMenuTree) {

    const buildMenuItem = (jsonMenuTree, isRoot = false) => {
      let
        id = isRoot ? MenuTreeItemModel.MENU_TREE_ROOT_ID : undefined,
        label = isRoot ? '' : jsonMenuTree['label'],
        url = isRoot ? '' : jsonMenuTree['url'],
        children = isRoot ? jsonMenuTree : jsonMenuTree.hasOwnProperty('children') ? jsonMenuTree['children'] : [];

      return new MenuTreeItemModel(
        children.map(jsonMenuItem => buildMenuItem(jsonMenuItem)),
        label,
        url,
        id
      );
    };

    return buildMenuItem(JSON.parse(jsonMenuTree), true);
  }

  static addChild(rootMenuItem, parentId, menuItem) {
    MenuTreeItemModel.validate(rootMenuItem);
    MenuTreeItemModel.validate(menuItem);

    const children = rootMenuItem.id === parentId
      ? rootMenuItem.children.concat(menuItem)
      : rootMenuItem.children.map(item => MenuTreeItemModel.addChild(item, parentId, menuItem));

    return new MenuTreeItemModel(
      children,
      rootMenuItem.label,
      rootMenuItem.url,
      rootMenuItem.id
    );
  }

  static addChildAt(rootMenuItem, parentId, index, menuItem) {
    MenuTreeItemModel.validate(rootMenuItem);
    MenuTreeItemModel.validate(menuItem);

    const children = rootMenuItem.id === parentId
      ? [...rootMenuItem.children.slice(0, index), menuItem, ...rootMenuItem.children.slice(index)]
      : rootMenuItem.children.map(item => MenuTreeItemModel.addChildAt(item, parentId, index, menuItem));

    return new MenuTreeItemModel(
      children,
      rootMenuItem.label,
      rootMenuItem.url,
      rootMenuItem.id
    );
  }

  static removeChild(rootMenuItem, itemId) {
    MenuTreeItemModel.validate(rootMenuItem);

    const children = rootMenuItem.children
      .filter(child => child.id !== itemId)
      .map(item => MenuTreeItemModel.removeChild(item, itemId));

    return new MenuTreeItemModel(
      children,
      rootMenuItem.label,
      rootMenuItem.url,
      rootMenuItem.id
    );
  }

  static updateChild(rootMenuItem, itemId, newLabel, newUrl) {
    MenuTreeItemModel.validate(rootMenuItem);

    const
      children = rootMenuItem.children.map(item => MenuTreeItemModel.updateChild(item, itemId, newLabel, newUrl)),
      label = rootMenuItem.id === itemId ? newLabel : rootMenuItem.label,
      url = rootMenuItem.id === itemId ? newUrl : rootMenuItem.url;

    return new MenuTreeItemModel(
      children,
      label,
      url,
      rootMenuItem.id
    );
  }

  static validate(object) {
    if (!object instanceof MenuTreeItemModel) {
      throw new Error('Provided object must be an instance of MenuTreeItemModel.');
    }
  }

  hasChildren() {
    return this.children.length > 0;
  }

  toJSON() {
    return {
      label: this.label,
      url: this.url,
      children: this.children.map(menuItem => menuItem.toJSON())
    };
  }
}

export default MenuTreeItemModel;
