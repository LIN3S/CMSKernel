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
import {EditableLabel, WithOutsideClick, IconAdd, IconRemove} from './../../bundle.components';
import {MenuTreeItemModel} from './../../bundle.model';

class MenuTreeItemView extends React.Component {

  static propTypes = {
    menuItemModel: React.PropTypes.instanceOf(MenuTreeItemModel).isRequired,
    nestLevel: React.PropTypes.number.isRequired,
    onAddMenuItem: React.PropTypes.func,
    onRemoveMenuItem: React.PropTypes.func,
    onUpdateMenuItem: React.PropTypes.func
  };

  static defaultProps = {
    nestLevel: 0,
    onAddMenuItem: () => {},
    onRemoveMenuItem: () => {},
    onUpdateMenuItem: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
      isLabelEditing: false,
      isLinkEditing: false
    };

    // Pre bind methods' context
    this.boundOnAddMenuItemButtonClick = this.onAddMenuItemButtonClick.bind(this);
    this.boundOnRemoveMenuItemButtonClick = this.onRemoveMenuItemButtonClick.bind(this);

    this.boundOnMenuItemClick = this.onMenuItemClick.bind(this);
    this.boundOnMenuItemOutsideClick = this.onMenuItemOutsideClick.bind(this);

    this.boundOnEditableLabelClick = this.onEditableLabelClick.bind(this);
    this.boundOnEditableLabelOutsideClick = this.onEditableLabelOutsideClick.bind(this);
    this.boundOnEditableLinkClick = this.onEditableLinkClick.bind(this);
    this.boundOnEditableLinkOutsideClick = this.onEditableLinkOutsideClick.bind(this);
    this.boundOnEditableLabelChange = this.onEditableLabelChange.bind(this);
    this.boundOnEditableLinkChange = this.onEditableLinkChange.bind(this);
  }

  onAddMenuItemButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const {onAddMenuItem, menuItemModel} = this.props;
    onAddMenuItem(menuItemModel.id);
  }

  onRemoveMenuItemButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const {onRemoveMenuItem, menuItemModel} = this.props;
    onRemoveMenuItem(menuItemModel.id);
  }

  onEditableLabelChange(newLabelValue) {
    const {onUpdateMenuItem, menuItemModel} = this.props;
    onUpdateMenuItem(menuItemModel.id, newLabelValue, menuItemModel.link);
  }

  onEditableLinkChange(newLinkValue) {
    const {onUpdateMenuItem, menuItemModel} = this.props;
    onUpdateMenuItem(menuItemModel.id, menuItemModel.label, newLinkValue);
  }

  onMenuItemClick() {
    this.setState({
      isOpened: true
    });
  }

  onMenuItemOutsideClick() {
    this.setState({
      isOpened: false
    });
  }

  onEditableLabelClick() {
    this.setState({
      isLabelEditing: true
    });
  }

  onEditableLabelOutsideClick() {
    this.setState({
      isLabelEditing: false
    });
  }

  onEditableLinkClick() {
    this.setState({
      isLinkEditing: true
    });
  }

  onEditableLinkOutsideClick() {
    this.setState({
      isLinkEditing: false
    });
  }

  render() {
    const {menuItemModel, nestLevel} = this.props;
    const {isOpened, isLabelEditing, isLinkEditing} = this.state;
    const menuItemCssClass = 'menu-tree__item' + (isOpened ? ' menu-tree__item--opened' : '');

    return <WithOutsideClick
      onItemClick={this.boundOnMenuItemClick}
      onOutsideClick={this.boundOnMenuItemOutsideClick}>
      <div
        className="menu-tree__item-wrapper"
        style={{
          transform: `translateX(${nestLevel * 20}px)`
        }}>
        <div className={menuItemCssClass}>
          <EditableLabel
            cssClass="editable-label--label"
            isEditing={isLabelEditing}
            label="label"
            onChange={this.boundOnEditableLabelChange}
            onClick={this.boundOnEditableLabelClick}
            onOutsideClick={this.boundOnEditableLabelOutsideClick}
            value={menuItemModel.label}/>
          <EditableLabel
            cssClass="editable-label--link"
            isEditing={isLinkEditing}
            label="link"
            onChange={this.boundOnEditableLinkChange}
            onClick={this.boundOnEditableLinkClick}
            onOutsideClick={this.boundOnEditableLinkOutsideClick}
            value={menuItemModel.link}/>
        </div>
        <button
          className="menu-tree__item-option menu-tree__item-option--add"
          onClick={this.boundOnAddMenuItemButtonClick}>
          <IconAdd/>
        </button>

        <button
          className="menu-tree__item-option menu-tree__item-option--remove"
          onClick={this.boundOnRemoveMenuItemButtonClick}>
          <IconRemove/>
        </button>
      </div>
    </WithOutsideClick>
  }
}

export default MenuTreeItemView;
