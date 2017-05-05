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

const NodeAddedObserver = lin3sEventBus.NodeAddedObserver;

const
  mountMenuTreeComponentOnNode = (menuTreeNode) => {
    const
      menuTreeReactWrapper = menuTreeNode.querySelector('.menu-tree__react-wrapper'),
      menuTreeFormInput = menuTreeNode.querySelector('.menu-tree__form-input');

    ReactDOM.render(
      <MenuTree formInput={menuTreeFormInput}/>,
      menuTreeReactWrapper
    );
  },
  onDomReady = () => {
    const
      menuTreeSelectorClassName = 'menu-tree',
      menuTrees = document.querySelectorAll(`.${menuTreeSelectorClassName}`);
    menuTrees.forEach(menuTree => mountMenuTreeComponentOnNode(menuTree));

    NodeAddedObserver.subscribe(menuTreeSelectorClassName, nodeAddedEvent =>
      mountMenuTreeComponentOnNode(nodeAddedEvent.node)
    );
  };

lin3sEventBus.onDomReady(onDomReady);
