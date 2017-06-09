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

const NodeAddedObserver = lin3sEventBus.NodeAddedObserver;

const
  mountDatePickerComponentOnNode = (datePickerNode) => {
    const
      datePickerReactWrapper = datePickerNode.querySelector('.datepicker__react-wrapper'),
      datePickerFormInput = datePickerNode.querySelector('.datepicker__form-input');

    ReactDOM.render(
      <DatePicker formInput={datePickerFormInput}/>,
      datePickerReactWrapper
    );
  },
  onDomReady = () => {
    const
      datePickerSelectorClassName = 'datepicker',
      datePickers = document.querySelectorAll(`.${datePickerSelectorClassName}`);
    datePickers.forEach(datePicker => mountDatePickerComponentOnNode(datePicker));

    NodeAddedObserver.subscribe(datePickerSelectorClassName, nodeAddedEvent =>
      nodeAddedEvent.nodes.forEach(node => mountDatePickerComponentOnNode(node))
    );
  };

lin3sEventBus.onDomReady(onDomReady);
