/*
 * This file is part of the CMS Kernel library.
 *
 * Copyright (c) 2016-2017 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {$, onDomReady} from './../../../../../../Ui/Assets/js/externals.modules';

const init = () => {
  $('#templateName').on('change', (event) => {
    $.get(`/admin/templates/${$(event.currentTarget).val()}`).done((response) => {
      $('.js-template').remove();
      $('#templateName').parent().after(response);
    });
  });
};

onDomReady(init);
