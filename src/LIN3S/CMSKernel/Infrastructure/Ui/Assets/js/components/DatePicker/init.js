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
import {DatePicker} from './../../bundle.components';

const init = () => {

  const datePickers = document.querySelectorAll('.datepicker');

  if (datePickers.length === 0) {
    return;
  }

  datePickers.forEach((datePicker) => {
    const
      datePickerReactWrapper = datePicker.querySelector('.datepicker__react-wrapper'),
      datePickerFormInput = datePicker.querySelector('.datepicker__form-input');

    ReactDOM.render(
      <DatePicker formInput={datePickerFormInput}/>,
      datePickerReactWrapper
    );
  });
};

lin3sEventBus.onDomReady(init);
