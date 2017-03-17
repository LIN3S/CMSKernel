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

class FullScreenModal extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired, // Single child
    isOpened: React.PropTypes.bool,
    onClickOutside: React.PropTypes.func
  };

  static defaultProps = {
    isOpened: false,
    onClickOutside: () => {
    }
  };

  constructor(props) {
    super(props);

    this.boundOnModalWrapperClick = this.onModalWrapperClick.bind(this);
    this.boundOnModalContentsClick = this.onModalContentsClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const documentBodyStyle = document.body.style;
    if (nextProps.isOpened) {
      documentBodyStyle.overflow = 'hidden';
    } else {
      documentBodyStyle.overflow = 'auto';
    }
  }

  onModalWrapperClick() {
    this.props.onClickOutside();
  }

  onModalContentsClick(event) {
    event.stopPropagation();
  }

  render() {
    const {isOpened, children} = this.props;
    const mainCssClass = 'full-screen-modal' + (isOpened ? ' full-screen-modal--opened' : '');

    return <div
      className="full-screen-modal__wrapper"
      onClick={this.boundOnModalWrapperClick}
      style={{
        pointerEvents: isOpened ? 'auto' : 'none'
      }}>
      <div className={mainCssClass}>
        <div className="full-screen-modal__background"></div>
        <div className="full-screen-modal__contents-wrapper">
          <div
            className="full-screen-modal__contents"
            onClick={this.boundOnModalContentsClick}>
            {children}
          </div>
        </div>
      </div>
    </div>;
  }

}

export default FullScreenModal;
