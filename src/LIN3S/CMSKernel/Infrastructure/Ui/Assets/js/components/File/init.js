/*
 * This file is part of the Distribution library.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */

import {ReactDOM, lin3sEventBus} from './../../bundle.dependencies';
import {File} from './../../bundle.components';

const init = () => {

  const files = document.querySelectorAll('.file');

  if (files.length === 0) {
    return;
  }

  files.forEach((file) => {
    const
      fileReactWrapper = file.querySelector('.file__react-wrapper'),
      fileFormInput = file.querySelector('.file__form-input');

    ReactDOM.render(
      <File formInput={fileFormInput}/>,
      fileReactWrapper
    );
  });
};

lin3sEventBus.onDomReady(init);
