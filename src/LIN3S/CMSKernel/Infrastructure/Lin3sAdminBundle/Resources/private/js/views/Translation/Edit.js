/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {React, ReactDOM, lin3sEventBus, ConfirmationModal} from './../../../../../../Ui/Assets/js/bundle.modules';

const removeTranslationCallBack = (element) => {
  return window.location.replace(
    element.getAttribute('data-url')
  );
};

const init = () => {

  const element = document.getElementById('react-confirmation-modal-remove-translation');

  if (element) {
    const trigger = {
      style: element.getAttribute('data-button-style'),
      content: element.getAttribute('data-button-title')
    };

    ReactDOM.render(
      <ConfirmationModal
        callback={removeTranslationCallBack.bind(this, element)}
        description={element.getAttribute('data-message-description')}
        title={element.getAttribute('data-message-title')}
        trigger={trigger}/>,
      element
    );
  }
};

lin3sEventBus.onDomReady(init);
