'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import EventPublisher from './../../EventPublisherInstance';
import {DOMReadyEventSubscriber} from 'lin3s-event-bus';
import {ConfirmationModal} from '../../../../../../../../../../vendor/lin3s/admin-bundle/src/LIN3S/AdminBundle/Resources/private/js/lib/index';

const removeTranslationCallBack = (element) => {
  return window.location.replace(
    element.getAttribute('data-url')
  );
};

const onReady = () => {
  const element = document.getElementById('react-confirmation-modal-remove-translation');

  if (element) {
    const trigger = {
      style: element.getAttribute('data-button-style'),
      content: element.getAttribute('data-button-title')
    };

    ReactDOM.render(
      <ConfirmationModal
        trigger={trigger}
        callback={removeTranslationCallBack.bind(this, element)}
        description={element.getAttribute('data-message-description')}
        title={element.getAttribute('data-message-title')}/>,
      element
    );
  }
};

const init = () => {
  EventPublisher.subscribe(
    new DOMReadyEventSubscriber(
      onReady
    )
  );
};
export default init();
