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

class MenuTreePlaceholderView extends React.Component {

  static propTypes = {
    menuItemModel: React.PropTypes.instanceOf(MenuTreeItemModel).isRequired
  };

  render() {
    const {menuItemModel} = this.props;

    return <div className="menu-tree__item-placeholder">
      <div className="menu-tree__item-wrapper">
        <div className="menu-tree__item">
          <div className="editable-label">
            <input
              className="editable-label__input"
              readOnly={true}
              type="text"
              value={menuItemModel.label}/>
          </div>
        </div>
      </div>
      {menuItemModel.children.map(item => <MenuTreePlaceholderView key={`menuItemPlaceholder-${item.id}`} menuItemModel={item}/>)}
    </div>;
  }
}

export default MenuTreePlaceholderView;
