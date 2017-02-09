/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import $ from 'jquery';
import EventPublisher from '../../EventPublisherInstance';
import {DOMReadyEventSubscriber} from 'lin3s-event-bus';

const onReady = () => {
  $('#templateName').on('change', (event) => {
    $.get(`/admin/templates/${$(event.currentTarget).val()}`).done((response) => {
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
