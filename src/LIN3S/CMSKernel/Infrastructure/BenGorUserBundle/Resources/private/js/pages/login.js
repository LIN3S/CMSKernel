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
import {DOMReadyEventSubscriber} from 'lin3s-event-bus';
import EventPublisher from './../../EventPublisherInstance';

const focusIn = (event) => {
  $(event.currentTarget).prev().addClass('bengor-user-login__form-label--focused');
};

const focusOut = (event) => {
  if (!$(event.currentTarget).val()) {
    $(event.currentTarget).prev().removeClass('bengor-user-login__form-label--focused');
  }
};

const onReady = () => {
  const $input = $('.bengor-user-login__form-input');

  if ($input.length === 0) {
    return;
  }

  $input.each(function () {
    if ($(this).val()) {
      $(this).prev().addClass('bengor-user-login__form-label--focused');
    }
  });

  $input.focusin(focusIn);
  $input.focusout(focusOut);
};

const init = () => {
  EventPublisher.subscribe(
    new DOMReadyEventSubscriber(
      onReady
    )
  );
};

export default init();
