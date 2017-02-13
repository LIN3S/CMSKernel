/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {$, onDomReady} from './../../../../../Ui/Assets/js/dependencies.modules';

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

  $input.each(function () {
    if ($(this).val()) {
      $(this).prev().addClass('bengor-user-login__form-label--focused');
    }
  });

  $input.focusin(focusIn);
  $input.focusout(focusOut);
};

onDomReady(init);
