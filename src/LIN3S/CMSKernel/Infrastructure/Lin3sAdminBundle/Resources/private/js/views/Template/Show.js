/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {$, lin3sEventBus} from './../../../../../../Ui/Assets/js/bundle.modules';

const init = () => {
  $('#templateName').on('change', (event) => {
    $.get(`/admin/templates/${$(event.currentTarget).val()}`).done((response) => {
      $('.js-template').remove();
      $('#templateName').parent().after(response);
    });
  });
};

lin3sEventBus.onDomReady(init);
