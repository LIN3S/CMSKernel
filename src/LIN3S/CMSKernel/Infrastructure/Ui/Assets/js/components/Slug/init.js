/*
 * This file is part of the Distribution library.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */

import {lin3sEventBus} from './../../bundle.dependencies';
import {Slug} from './../../bundle.components';

const NodeAddedObserver = lin3sEventBus.NodeAddedObserver;

const
  initSlugComponentOnNode = (slugNode) => {
    new Slug(slugNode);
  },
  onDomReady = () => {
    const
      slugSelectorClassName = 'slug',
      slugs = document.querySelectorAll(`.${slugSelectorClassName}`);
    Array.from(slugs).forEach(slug => initSlugComponentOnNode(slug));

    NodeAddedObserver.subscribe(slugSelectorClassName, nodeAddedEvent =>
      nodeAddedEvent.nodes.forEach(node => initSlugComponentOnNode(node))
    );
  };

lin3sEventBus.onDomReady(onDomReady);
