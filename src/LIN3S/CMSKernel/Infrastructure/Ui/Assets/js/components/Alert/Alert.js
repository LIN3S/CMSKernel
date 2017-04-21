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
import {reactPropTypeOneOf} from './../../bundle.util';

class Alert extends React.Component {

  static getTypes() {
    return Object.keys(Alert.TYPE).map(key => Alert.TYPE[key]);
  };

  static TYPE = {
    SUCCESS:  'SUCCESS',
    INFO:     'INFO',
    WARNING:  'WARNING',
    ERROR:    'ERROR'
  };

  static propTypes = {
    message: React.PropTypes.string.isRequired,
    onRemove: React.PropTypes.func,
    type: reactPropTypeOneOf(Alert.getTypes())
  };

  static defaultProps = {
    onRemove: () => {},
    type: Alert.TYPE.SUCCESS
  };

  constructor(props) {
    super(props);

    // Pre-bind methods' context
    this.boundOnRemove = this.onRemove.bind(this);
  }

  onRemove(event) {
    const {onRemove} = this.props;
    event.preventDefault();
    onRemove();
  }

  getDangerousHtml(html) {
    return {__html: html};
  }

  getCssClass() {
    const {type} = this.props;
    switch (type) {
      case Alert.TYPE.SUCCESS:
        return 'alert--success';
      case Alert.TYPE.WARNING:
        return 'alert--warning';
      case Alert.TYPE.ERROR:
        return 'alert--error';
      default: // Alert.TYPE.INFO
        return 'alert--info';
    }
  }

  render() {
    const {message} = this.props;
    const alertCssClass = `alert ${this.getCssClass()}`;

    return <div className={alertCssClass}>
      <div className="alert__content" dangerouslySetInnerHTML={this.getDangerousHtml(message)}></div>
      <button
        className="alert__remove"
        onClick={this.boundOnRemove}>✕</button>
    </div>;
  }
}

export default Alert;
