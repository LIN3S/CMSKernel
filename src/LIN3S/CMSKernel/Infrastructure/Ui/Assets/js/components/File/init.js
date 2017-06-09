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
import {File} from './../../bundle.components';

const NodeAddedObserver = lin3sEventBus.NodeAddedObserver;

const
  mountFileComponentOnNode = (fileNode) => {
    const
      fileReactWrapper = fileNode.querySelector('.file__react-wrapper'),
      fileFormInput = fileNode.querySelector('.file__form-input');

    ReactDOM.render(
      <File formInput={fileFormInput}/>,
      fileReactWrapper
    );
  },
  onDomReady = () => {
    const
      fileSelectorClassName = 'file',
      files = document.querySelectorAll(`.${fileSelectorClassName}`);
    files.forEach(file => mountFileComponentOnNode(file));

    NodeAddedObserver.subscribe(fileSelectorClassName, nodeAddedEvent =>
      nodeAddedEvent.nodes.forEach(node => mountFileComponentOnNode(node))
    );
  };

lin3sEventBus.onDomReady(onDomReady);
