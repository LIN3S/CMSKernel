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

class WithOutsideClick extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    cssClass: React.PropTypes.string,
    onItemClick: React.PropTypes.func,
    onOutsideClick: React.PropTypes.func
  };

  static defaultProps = {
    cssClass: '',
    onItemClick: () => {},
    onOutsideClick: () => {}
  };

  itemRef;

  constructor(props) {
    super(props);

    // Pre-bind methods' context
    this.boundOnOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.boundOnOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.boundOnOutsideClick);
  }

  onOutsideClick(event) {
    const {target} = event;
    if (target === this.itemRef || this.itemRef.contains(target)) {
      return;
    }

    this.props.onOutsideClick(event);
  }

  render() {
    const {cssClass, children: ChildComponent, onItemClick} = this.props;
    const mainCssClass = `with-outside-click ${cssClass}`;

    return <div
      className={mainCssClass}
      onClick={onItemClick}
      ref={ref => this.itemRef = ref}>
      {ChildComponent}
    </div>
  }
}

export default WithOutsideClick;
