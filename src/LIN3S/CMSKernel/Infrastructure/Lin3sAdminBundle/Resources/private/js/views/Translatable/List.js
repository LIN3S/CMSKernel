/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {React, ReactDOM, lin3sEventBus} from './../../../../../../Ui/Assets/js/bundle.modules';

import NewTranslatableModal from './../../components/NewTranslatableModal/App';

const newTranslatableCallback = (element) => {
  return window.location.replace(
    `${element.getAttribute('data-url')}?locale=${element.getAttribute('data-selected-locale')}`
  );
};

const init = () => {
  const element = document.getElementById('react-confirm-global-action');

  if (element) {
    const trigger = {
      style: element.getAttribute('data-button-style'),
      content: element.getAttribute('data-button-title')
    };

    ReactDOM.render(
      <NewTranslatableModal
        button={element.getAttribute('data-message-button')}
        callback={newTranslatableCallback.bind(this, element)}
        content={element.getAttribute('data-message-content')}
        title={element.getAttribute('data-message-title')}
        trigger={trigger}/>,
      element
    );
  }
};

lin3sEventBus.onDomReady(init);
