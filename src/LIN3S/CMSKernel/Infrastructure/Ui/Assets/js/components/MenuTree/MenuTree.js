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
import {MenuTreeItemModel} from './../../bundle.model';
import {setFormInputValue, getFormInputAttribute} from './../../bundle.util';

import MenuTreeView from './MenuTreeView';

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

    this.boundAddMenuItem = this.addMenuItem.bind(this);
    this.boundRemoveMenuItem = this.removeMenuItem.bind(this);
    this.boundUpdateMenuItem = this.updateMenuItem.bind(this);
  }

  getInitialMenuTree() {
//     const {formInput} = this.props;
//     const menuTreeJson = getFormInputAttribute(formInput, 'data-menu-tree');
//     if (menuTreeJson === '') {
//       return undefined;
//     }
//
//     return MenuTreeModel.fromJsonString(menuTreeJson);

    return new MenuTreeItemModel([
      new MenuTreeItemModel([
        new MenuTreeItemModel([
          new MenuTreeItemModel(),
          new MenuTreeItemModel()
        ], 'label A.1', 'http://google.com'),
        new MenuTreeItemModel()
      ], 'label A', 'http://google.com'),
      new MenuTreeItemModel(),
      new MenuTreeItemModel(),
      new MenuTreeItemModel(),
      new MenuTreeItemModel()
    ], 'TOP LEVEL MENU TREE ITEM', '', -1);
  }

  persistChanges(menuTree) {
    const {formInput} = this.props;
    setFormInputValue(formInput, JSON.stringify(menuTree));

    this.setState({
      menuTree: menuTree
    });
  }

  onAddMenuItemButtonClick(event) {
    event.preventDefault();

    const {menuTree} = this.state;
    const newMenuTree = MenuTreeItemModel.addChild(menuTree, -1);
    this.persistChanges(newMenuTree);
  }

  addMenuItem(menuItemId) {
    const {menuTree} = this.state;
    const newMenuTree = MenuTreeItemModel.addChild(menuTree, menuItemId);
    this.persistChanges(newMenuTree);
  }

  removeMenuItem(menuItemId) {
    const {menuTree} = this.state;
    const newMenuTree = MenuTreeItemModel.removeChild(menuTree, menuItemId);
    this.persistChanges(newMenuTree);
  }

  updateMenuItem(menuItemId, label, link) {
    const {menuTree} = this.state;
    const newMenuTree = MenuTreeItemModel.updateChild(menuTree, menuItemId, label, link);
    this.persistChanges(newMenuTree);
  }

  render() {
    const {menuTree} = this.state;

    return <div className="menu-tree">
      <button
        className="button button--cms"
        onClick={this.boundOnAddMenuItemButtonClick}>
        Add menu item
      </button>

      <MenuTreeView
        menuTree={menuTree}
        onAddMenuItem={this.boundAddMenuItem}
        onRemoveMenuItem={this.boundRemoveMenuItem}
        onUpdateMenuItem={this.boundUpdateMenuItem}/>
    </div>;
  }
}

export default MenuTree;
