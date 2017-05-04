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
import {NodeAddedEvent, NodeAddedEventSubscriber} from '../bundle.observer';

const
  EventPublisher = lin3sEventBus.EventPublisher,
  Priority = lin3sEventBus.Priority;

class NodeAddedObserver {

  mutationObserver;
  subscribers;
  subscribersSelectorClassNames;

  constructor() {
    this.subscribers = new Map();
    this.subscribersSelectorClassNames = [];
    this.initMutationObserver();
  }

  initMutationObserver() {
    const
      targetNode = document.body,
      observerConfig = {
        childList: true,
        subtree: true
      };

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    this.mutationObserver = new MutationObserver(this.onNodeMutated.bind(this));
    this.mutationObserver.observe(targetNode, observerConfig);
  }

  subscribe(selectorClassName, onNodeAddedCallback, priority) {
    if (this.subscribers.has(selectorClassName)) {
      return;
    }

    this.subscribers.set(selectorClassName, onNodeAddedCallback); // Redundant
    this.subscribersSelectorClassNames.push(selectorClassName);

    EventPublisher.subscribe(
      new NodeAddedEventSubscriber(
        onNodeAddedCallback,
        new Priority(priority),
        selectorClassName
      )
    );
  }

  onNodeMutated(mutations) {
    mutations.forEach(mutation =>
      Array.from(mutation.addedNodes)
        .forEach(node => {
          const nodeSelectorClassName = this.subscribersSelectorClassNames.filter(selectorClassName =>
            node.classList !== undefined && node.classList.contains(selectorClassName)
          );

          if (nodeSelectorClassName.length > 0) {
            EventPublisher.publish(
              new NodeAddedEvent(node, nodeSelectorClassName[0])
            );
          }
        })
    );
  }
}

const mutationObserverInstance = new NodeAddedObserver();

export default mutationObserverInstance;
