/*
 * This file is part of the Distribution library.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikel@lin3s.com>
 */

import {ReactDOM, lin3sEventBus, Wysiwyg} from './../../bundle.modules';

const init = () => {

  const wysiwygs = document.querySelectorAll('.wysiwyg');

  if (wysiwygs.length === 0) {
    return;
  }

  wysiwygs.forEach((wysiwyg) => {
    const
      wysiwygReactWrapper = wysiwyg.querySelector('.wysiwyg__react-wrapper'),
      wysiwygFormInput = wysiwyg.querySelector('.wysiwyg__form-input');

    ReactDOM.render(
      <Wysiwyg formInput={wysiwygFormInput}/>,
      wysiwygReactWrapper
    );
  });
};

lin3sEventBus.onDomReady(init);
