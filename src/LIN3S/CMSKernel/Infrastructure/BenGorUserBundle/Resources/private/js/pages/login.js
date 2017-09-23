/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2016-present LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {$, lin3sEventBus} from './../../../../../Ui/Assets/js/bundle.dependencies';

const INPUT_CSS_CLASS_SELECTOR = 'bengor-user-login__form-input';

const inputChange = (input) => {
  if ($(input).val()) {
    $(input).addClass(`${INPUT_CSS_CLASS_SELECTOR}--filled`);
  } else {
    $(input).removeClass(`${INPUT_CSS_CLASS_SELECTOR}--filled`);
  }
};

const bindInputOnChangeListener = (domNode) => {
  $(domNode).on('change', (event) => {
    inputChange($(event.currentTarget));
  });
};

const init = () => {
  bindInputOnChangeListener($(`.${INPUT_CSS_CLASS_SELECTOR}`));

  lin3sEventBus.NodeAddedObserver.subscribe(INPUT_CSS_CLASS_SELECTOR, nodeAddedEvent =>
    bindInputOnChangeListener(nodeAddedEvent.nodes));
};

lin3sEventBus.onDomReady(init);
