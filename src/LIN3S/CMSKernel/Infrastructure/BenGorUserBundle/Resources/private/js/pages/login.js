/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {$, lin3sEventBus} from './../../../../../Ui/Assets/js/bundle.dependencies';

const focusIn = (event) => {
  $(event.currentTarget).prev().addClass('bengor-user-login__form-label--focused');
};

const focusOut = (event) => {
  if (!$(event.currentTarget).val()) {
    $(event.currentTarget).prev().removeClass('bengor-user-login__form-label--focused');
  }
};

const init = () => {
  const $input = $('.bengor-user-login__form-input');

  if ($input.length === 0) {
    return;
  }

  $input.each(function (index, element) {
    $(element).focus((event) => {
      $(event.currentTarget).prev().addClass('bengor-user-login__form-label--focused');
    });
  });

  $('input[autofocus]').trigger('focus');

  $input.focusin(focusIn);
  $input.focusout(focusOut);
};

lin3sEventBus.onDomReady(init);
