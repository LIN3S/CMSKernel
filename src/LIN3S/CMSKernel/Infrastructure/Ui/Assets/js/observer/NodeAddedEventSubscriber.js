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
import {NodeAddedEvent} from '../bundle.observer';

const EventSubscriber = lin3sEventBus.EventSubscriber;

class NodeAddedEventSubscriber extends EventSubscriber {

  domSelectorClassName;

  constructor(aCallback, aPriority, domSelectorClassName) {
    super(aCallback, aPriority);

    this.domSelectorClassName = domSelectorClassName;
  }

  isSubscribedTo(anEvent) {
    const event = new NodeAddedEvent();

    return anEvent.getName() === event.getName() && this.domSelectorClassName === anEvent.domSelectorClassName;
  }
}

export default NodeAddedEventSubscriber;
