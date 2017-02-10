'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {EventPublisher, DOMReadyEventSubscriber} from 'lin3s-event-bus';
import WysiwygWrapper from './WysiwygWrapper';

const init = () => {
  const wysiwygs = document.querySelectorAll('.wysiwyg');

  if (wysiwygs.length > 0) {
    wysiwygs.forEach((wysiwyg) => {
      const
        wysiwygReactWrapper = wysiwyg.querySelector('.wysiwyg__react-wrapper'),
        wysiwygFormInput = wysiwyg.querySelector('.wysiwyg__form-input');

      ReactDOM.render(
        <WysiwygWrapper formInput={wysiwygFormInput}/>,
        wysiwygReactWrapper
      );
    });
  }
};

EventPublisher.subscribe(
  new DOMReadyEventSubscriber(
    init
  )
);
