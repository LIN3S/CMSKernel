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
import {EditableLabel, WithOutsideClick, IconAdd, IconRemove, IconMove} from './../../bundle.components';
import {MenuTreeItemModel} from './../../bundle.model';

const
  Motion = ReactMotion.Motion,
  spring = ReactMotion.spring;

class MenuTreeItemView extends React.Component {

  static propTypes = {
    isSelected: React.PropTypes.bool,
    menuItemModel: React.PropTypes.instanceOf(MenuTreeItemModel).isRequired,
    onAddMenuItem: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onOutsideClick: React.PropTypes.func,
    onRemoveMenuItem: React.PropTypes.func,
    onUpdateMenuItem: React.PropTypes.func
  };

  static defaultProps = {
    isSelected: false,
    onAddMenuItem: () => {},
    onClick: () => {},
    onOutsideClick: () => {},
    onRemoveMenuItem: () => {},
    onUpdateMenuItem: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
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

    // Drag/Drop
    this.boundOnDragHandleButtonClick = this.onDragHandleButtonClick.bind(this);
    this.boundOnDragHandleButtonMouseDown = this.onDragHandleButtonMouseDown.bind(this);
    this.boundOnDragHandleButtonMouseUp = this.onDragHandleButtonMouseUp.bind(this);
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

  onDragHandleButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragHandleButtonMouseDown() {
    const {onOutsideClick} = this.props;
    onOutsideClick();

    // TODO
  }

  onDragHandleButtonMouseUp() {
    // TODO
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
    const {onClick, menuItemModel} = this.props;
    onClick(menuItemModel.id);
  }

  onMenuItemOutsideClick() {
    const {onOutsideClick} = this.props;
    onOutsideClick();
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

  getMenuItemLinkStyle() {
    const {isSelected} = this.props;
    const translateY = isSelected ? -6 : -50;
    return {
      translateY: spring(translateY)
    };
  }

  render() {
    const {menuItemModel} = this.props;
    const {isLabelEditing, isLinkEditing} = this.state;

    return <WithOutsideClick
      onItemClick={this.boundOnMenuItemClick}
      onOutsideClick={this.boundOnMenuItemOutsideClick}>
      <div className="menu-tree__item-wrapper">
        <div className="menu-tree__item">
          <EditableLabel
            cssClass="editable-label--label"
            isEditing={isLabelEditing}
            label="label"
            onChange={this.boundOnEditableLabelChange}
            onClick={this.boundOnEditableLabelClick}
            onOutsideClick={this.boundOnEditableLabelOutsideClick}
            value={menuItemModel.label}/>
          <Motion style={this.getMenuItemLinkStyle()}>
            {({translateY}) =>
              <div style={{
                transform: `translateY(${translateY}px)`
              }}>
                <EditableLabel
                  cssClass="editable-label--link"
                  isEditing={isLinkEditing}
                  label="link"
                  onChange={this.boundOnEditableLinkChange}
                  onClick={this.boundOnEditableLinkClick}
                  onOutsideClick={this.boundOnEditableLinkOutsideClick}
                  value={menuItemModel.link}/>
              </div>}
          </Motion>
        </div>
        <button
          className="menu-tree__item-option menu-tree__item-option--drag"
          onClick={this.boundOnDragHandleButtonClick}
          onMouseDown={this.boundOnDragHandleButtonMouseDown}
          onMouseUp={this.boundOnDragHandleButtonMouseUp}>
          <IconMove/>
        </button>
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
