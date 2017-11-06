/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */

import {React, ReactDates, moment} from './../../bundle.dependencies';
import {setFormInputValue, getFormInputValue} from './../../bundle.util';

const
  SingleDatePicker = ReactDates.SingleDatePicker,
  toMomentObject = ReactDates.toMomentObject,
  toISODateString = ReactDates.toISODateString;

class DatePicker extends React.Component {

  static propTypes = {
    formInput: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    moment.locale('es');

    this.state = {
      selectedDate: toMomentObject(getFormInputValue(this.props.formInput)),
      focused: false
    };

    // Pre-bind method's context
    this.boundOnDateChange = this.onDateChange.bind(this);
    this.boundOnDateFocusChange = this.onDateFocusChange.bind(this);
    this.boundIsOutsideRange = this.isOutsideRange.bind(this);
    this.boundDisplayFormat = this.displayFormat.bind(this);
  }

  persistChanges(date) {
    const {formInput} = this.props;
    setFormInputValue(formInput, toISODateString(date));
    this.setState({
      selectedDate: date
    });
  }

  onDateFocusChange({focused}) {
    this.setState({
      focused: focused
    });
  }

  onDateChange(date) {
    this.persistChanges(date);
  }

  isOutsideRange(day) {
    return false;
  }

  displayFormat() {
    moment.locale('es');
    return moment.localeData().longDateFormat('L');
  }

  render() {
    return <div className="datepicker__wrapper">
      <SingleDatePicker
        date={this.state.selectedDate}
        displayFormat={this.boundDisplayFormat}
        focused={this.state.focused}
        isOutsideRange={this.boundIsOutsideRange}
        numberOfMonths={1}
        onDateChange={this.boundOnDateChange}
        onFocusChange={this.boundOnDateFocusChange}
        reopenPickerOnClearDate={true}
        showClearDate={true}
      />
    </div>
  }
}

export default DatePicker;
