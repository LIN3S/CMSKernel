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
import {WithOutsideClick} from './../../bundle.components';

/**
 * This is a controlled component that maintains it's own state
 */

class EditableLabel extends React.Component {

  static propTypes = {
    cssClass: React.PropTypes.string,
    isEditing: React.PropTypes.bool,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onOutsideClick: React.PropTypes.func,
    value: React.PropTypes.string
  };

  static defaultProps = {
    cssClass: '',
    isEditing: false,
    onChange: () => {},
    onClick: () => {},
    onOutsideClick: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };

    // Pre-bind methods' context
    this.boundOnChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value === nextProps.value) {
      return;
    }

    this.state = {
      value: nextProps.value,
    };
  }

  onChange(event) {
    const newValue = event.target.value;
    this.setState({
      value: newValue
    });

    const {onChange} = this.props;
    onChange(newValue);
  }

  render() {
    const {cssClass, isEditing, label, onClick, onOutsideClick} = this.props;
    const {value} = this.state;
    const editableLabelCssClass = 'editable-label ' + cssClass + (isEditing ? ' editable-label--editing' : '');

    return <WithOutsideClick
      onItemClick={onClick}
      onOutsideClick={onOutsideClick}>
      <div className={editableLabelCssClass}>
        <label className="editable-label__input-label">
          {label}
        </label>
        <input
          className="editable-label__input"
          onChange={this.boundOnChange}
          onFocus={onClick}
          onBlur={onOutsideClick}
          type="text"
          value={value}/>
      </div>
    </WithOutsideClick>
  }
}

export default EditableLabel;
