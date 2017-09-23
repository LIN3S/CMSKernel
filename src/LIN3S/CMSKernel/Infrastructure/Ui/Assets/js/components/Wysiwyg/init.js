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
import {Wysiwyg} from './../../bundle.components';

const NodeAddedObserver = lin3sEventBus.NodeAddedObserver;

const
  mountWysiwygComponentOnNode = (wysiwygNode) => {
    const
      wysiwygReactWrapper = wysiwygNode.querySelector('.wysiwyg__react-wrapper'),
      wysiwygFormInput = wysiwygNode.querySelector('.wysiwyg__form-input');

    ReactDOM.render(
      <Wysiwyg formInput={wysiwygFormInput}/>,
      wysiwygReactWrapper
    );
  },
  onDomReady = () => {
    const
      wysiwygSelectorClassName = 'wysiwyg',
      wysiwygs = document.querySelectorAll(`.${wysiwygSelectorClassName}`);

    Array.from(wysiwygs).forEach(wysiwyg => mountWysiwygComponentOnNode(wysiwyg));

    NodeAddedObserver.subscribe(wysiwygSelectorClassName, nodeAddedEvent =>
      nodeAddedEvent.nodes.forEach(node => mountWysiwygComponentOnNode(node))
    );
  };

lin3sEventBus.onDomReady(onDomReady);
