/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */

import {React, ReactDOM, lin3sEventBus} from './../../../../../../Ui/Assets/js/bundle.dependencies';
import {ConfirmationModal} from './../../../../../../Ui/Assets/js/bundle.components';

const removeCallBack = (element) => {
  return window.location.replace(
    element.getAttribute('data-url')
  );
};

const init = () => {
  const removeActions = document.querySelectorAll('.js-react-confirmation-modal-remove');

  console.log(removeActions);

  if (removeActions.length === 0) {
    return;
  }
  removeActions.forEach((removeAction) => {
    const trigger = {
      style: removeAction.getAttribute('data-button-style'),
      content: removeAction.getAttribute('data-button-title')
    };

    ReactDOM.render(
      <ConfirmationModal
        callback={removeCallBack.bind(this, removeAction)}
        description={removeAction.getAttribute('data-message-description')}
        title={removeAction.getAttribute('data-message-title')}
        trigger={trigger}
      />,
      removeAction
    );
  });
};

lin3sEventBus.onDomReady(init);
