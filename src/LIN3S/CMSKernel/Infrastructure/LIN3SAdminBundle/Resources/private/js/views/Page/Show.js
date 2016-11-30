'use strict';

import $ from 'jquery';
import EventPublisher from './../../EventPublisherInstance';
import {DOMReadyEventSubscriber} from 'lin3s-event-bus';

const onReady = () => {
  $('#templateName').on('change', (event) => {
    $.get(`/admin/template/${$(event.currentTarget).val()}`).done((response) => {
      $('.js-template').remove();
      $('#templateName').parent().after(response);
    });
  });
};

const init = () => {
  EventPublisher.subscribe(
    new DOMReadyEventSubscriber(
      onReady
    )
  );
};
export default init();
