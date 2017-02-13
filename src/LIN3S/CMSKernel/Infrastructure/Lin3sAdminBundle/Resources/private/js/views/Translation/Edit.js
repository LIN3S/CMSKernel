/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {React, ReactDOM, onDomReady} from './../../../../../../Ui/Assets/js/dependencies.modules';

import {ConfirmationModal} from './../../../../../../Ui/Assets/js/components/components.library';

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

onDomReady(init);
