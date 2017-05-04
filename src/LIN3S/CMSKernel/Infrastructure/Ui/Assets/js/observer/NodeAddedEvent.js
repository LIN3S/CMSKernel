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

import {lin3sEventBus} from './../bundle.dependencies';

const Event = lin3sEventBus.Event;

class NodeAddedEvent extends Event {

  static NAME = 'NODE_ADDED';

  node;

  constructor(node, domSelectorClassName) {
    super(NodeAddedEvent.NAME);

    this.node = node;
    this.domSelectorClassName = domSelectorClassName;
  }


}

export default NodeAddedEvent;
