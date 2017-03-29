/*
 * This file is part of the Distribution library.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */

import {ReactDOM, lin3sEventBus} from './../../bundle.dependencies';
import {MenuTree} from './../../bundle.components';

const init = () => {

  const menuTrees = document.querySelectorAll('.menu-tree');

  if (menuTrees.length === 0) {
    return;
  }

  menuTrees.forEach((menuTree) => {
    const
      menuTreeReactWrapper = menuTree.querySelector('.menu-tree__react-wrapper'),
      menuTreeFormInput = menuTree.querySelector('.menu-tree__form-input');

    ReactDOM.render(
      <MenuTree formInput={menuTreeFormInput}/>,
      menuTreeReactWrapper
    );
  });
};

lin3sEventBus.onDomReady(init);
