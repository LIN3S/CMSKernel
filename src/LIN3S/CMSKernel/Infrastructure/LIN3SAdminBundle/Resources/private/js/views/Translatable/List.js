'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import EventPublisher from './../../EventPublisherInstance';
import {DOMReadyEventSubscriber} from 'lin3s-event-bus';
import NewTranslatableModal from './../../components/NewTranslatableModal/App';

const newTranslatableCallback = (element) => {
  return window.location.replace(
    `${element.getAttribute('data-url')}?locale=${element.getAttribute('data-selected-locale')}`
  );
};

const onReady = () => {
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

const init = () => {
  EventPublisher.subscribe(
    new DOMReadyEventSubscriber(
      onReady
    )
  );
};
export default init();
