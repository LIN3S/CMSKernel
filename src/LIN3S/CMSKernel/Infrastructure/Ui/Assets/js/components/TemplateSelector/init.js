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
import {TemplateSelector} from './../../bundle.components';

const NodeAddedObserver = lin3sEventBus.NodeAddedObserver;

const
  initTemplateSelectorComponentOnNode = templateSelectorNode => new TemplateSelector(templateSelectorNode),
  onDomReady = () => {
    const
      templateSelectorSelectorClassName = 'template-selector',
      templateSelectors = document.querySelectorAll(`.${templateSelectorSelectorClassName}`);

    Array.from(templateSelectors).forEach(templateSelector => initTemplateSelectorComponentOnNode(templateSelector));

    NodeAddedObserver.subscribe(templateSelectorSelectorClassName, nodeAddedEvent =>
      nodeAddedEvent.nodes.forEach(node => initTemplateSelectorComponentOnNode(node))
    );
  };

lin3sEventBus.onDomReady(onDomReady);
