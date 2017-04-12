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

  id;
  label;
  link;
  children = [];

  constructor(children = [], label = 'Menu item label', link = '/', id = getNextUuid()) {
    this.id = id;
    this.label = label;
    this.link = link;
    this.children = children;
  }

  static fromJsonString(jsonStringMenuTree) {
    return MenuTreeItemModel.fromJson(JSON.parse(jsonStringMenuTree));
  }

  static fromJson(jsonMenuTree) {
    return new MenuTreeItemModel(
      jsonMenuTree['children'],
      jsonMenuTree['label'],
      jsonMenuTree['link'],
      jsonMenuTree['id']
    );
  }

  static addChild(rootMenuItem, parentId) {
    const children = rootMenuItem.id === parentId
      ? rootMenuItem.children.concat(new MenuTreeItemModel())
      : rootMenuItem.children.map((item) => {
        return MenuTreeItemModel.addChild(item, parentId);
      });

    return new MenuTreeItemModel(
      children,
      rootMenuItem.label,
      rootMenuItem.link,
      rootMenuItem.id
    );
  }

  static removeChild(rootMenuItem, itemId) {
    const children = rootMenuItem.children
      .filter(child => child.id !== itemId)
      .map((item) => {
        return MenuTreeItemModel.removeChild(item, itemId);
      });

    return new MenuTreeItemModel(
      children,
      rootMenuItem.label,
      rootMenuItem.link,
      rootMenuItem.id
    );
  }

  static updateChild(rootMenuItem, itemId, newLabel, newLink) {
    const
      children = rootMenuItem.children.map((item) => {
        return MenuTreeItemModel.updateChild(item, itemId, newLabel, newLink);
      }),
      label = rootMenuItem.id === itemId ? newLabel : rootMenuItem.label,
      link = rootMenuItem.id === itemId ? newLink : rootMenuItem.link;

    return new MenuTreeItemModel(
      children,
      label,
      link,
      rootMenuItem.id
    );
  }

  validateChild(child) {
    if (!child instanceof MenuTreeItemModel) {
      throw new Error('Provided child must be an instance of MenuTreeItemModel.');
    }
  }

  hasChildren() {
    return this.children.length > 0;
  }

  toJSON() {
    return {
      id: this.id,
      label: this.label,
      link: this.link,
      children: this.children.map(menuItem => menuItem.toJSON())
    };
  }
}

export default MenuTreeItemModel;
