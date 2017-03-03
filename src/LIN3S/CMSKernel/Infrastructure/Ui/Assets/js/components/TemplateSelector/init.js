/*
 * This file is part of the Distribution library.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */

import {lin3sEventBus, TemplateSelector} from './../../bundle.modules';

const init = () => {

  const templates = document.querySelectorAll('.template');

  if (templates.length === 0) {
    return;
  }

  new TemplateSelector();

  console.log('eeee');

  templates.each((template) => {
    const
      templateName = template.querySelector('.template__name'),
      templateChildren = template.querySelector('.template__children');

    templateName.querySelector('select').value;


  });
};

lin3sEventBus.onDomReady(init);
