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

import Tab from './Tab';

const tabType = React.PropTypes.shape({
  type: React.PropTypes.oneOf([Tab])
});

class Tabbed extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(tabType), // array of Tabs
      tabType // single Tab
    ]).isRequired,
    onTabSelected: React.PropTypes.func.isRequired,
    selectedTabIndex: React.PropTypes.number
  };

  static defaultProps = {
    selectedTabIndex: 0
  };

  onTabLabelClick(tabIndex) {
    const {onTabSelected} = this.props;
    onTabSelected(tabIndex);
  }

  render() {
    const {selectedTabIndex, children} = this.props;

    return <div className="tabbed">
      <div className="tabbed__label-group">
        {children.map((child, index) => {
          const tabLabelCSSClass = 'tabbed__label' + (index === selectedTabIndex ? ' tabbed__label--active' : '');
          return <div
            className={tabLabelCSSClass}
            key={`tabbed__label-${index}`}
            onClick={this.onTabLabelClick.bind(this, index)}>
            {child.props.label}
          </div>
        })}
      </div>
      <div className="tabbed__content-wrapper">
        {children.map((child, index) =>
          <div
            className="tabbed__content"
            key={`tabbed__content-${index}`}
            style={{
              display: index === selectedTabIndex ? 'block' : 'none'
            }}>
            {child}
          </div>
        )}
      </div>
    </div>;
  }

}

export default Tabbed;
