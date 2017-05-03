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

import {React, debounce} from './../../bundle.dependencies';
import {IconSearch} from './../../bundle.components';

class SearchBox extends React.Component {

  static propTypes = {
    debounceTime: React.PropTypes.number,
    onQueryUpdated: React.PropTypes.func
  };

  static defaultProps = {
    debounceTime: 500,
    onQueryUpdated: () => {}
  };

  constructor(props) {
    super(props);

    this.debouncedOnChange = debounce((value) => {
      const {onQueryUpdated} = this.props;
      onQueryUpdated(value);
    }, this.props.debounceTime);

    // Pre-bind methods' context
    this.boundOnChange = this.onChange.bind(this);
  }

  onChange(event) {
    const value = event.target.value;
    this.debouncedOnChange(value);
  }

  render() {
    return <div className="search-box">
      <IconSearch/>
      <input
        className="search-box__input"
        onChange={this.boundOnChange}
        placeholder="Search"
        type="text"/>
    </div>;
  }

}

export default SearchBox;
