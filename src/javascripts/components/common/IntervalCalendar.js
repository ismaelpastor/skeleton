import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import esES from 'rc-calendar/lib/locale/es_ES';
import enUS from 'rc-calendar/lib/locale/en_US';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';

import { injectIntl } from 'react-intl';

import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/en-gb';

const es = window.location.search.indexOf('es') !== -1;

if (es) {
  moment.locale('es-es');
} else {
  moment.locale('en-gb');
}

const now = moment();
if (es) {
  now.utcOffset(8);
} else {
  now.utcOffset(0);
}

const timePickerElement = (
  <TimePickerPanel
    showSecond={false}
    defaultValue={[
      moment('00:00:00', 'HH:mm:ss'),
      moment('23:59:59', 'HH:mm:ss')
    ]}
  />
);

function disabledTime(time, type) {
  if (type === 'start') {
    return {
      disabledHours() {
        return [];
      },
      disabledMinutes() {
        return [];
      },
      disabledSeconds() {
        return [];
      }
    };
  }
  return {
    disabledHours() {
      return [];
    },
    disabledMinutes() {
      return [];
    },
    disabledSeconds() {
      return [];
    }
  };
}

/* function disabledDate(current) {
  if (!current) {
    // allow empty select
    return false;
  }
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.valueOf() < date.valueOf(); // can not select days before today
} */

const formatStr = 'DD/MM/YYYY HH:mm';
function format(v) {
  return v ? v.format(formatStr) : '';
}

function isValidRange(v) {
  const date = moment();
  const result = v && v[0] && v[1] >= date;
  if (!result) {
    v = ['', ''];
  }
  return result;
}

/**
 * Default constructor of the class RangeCalendar
 * @param {object} value properties
 * @returns {nothing} nothing, just a constructor.
 */
class IntervalCalendar extends Component {
  /**
   * Default constructor of the class RangeCalendar.
   * @param {object} props properties
   * @returns {nothing} nothing, just a constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      hoverValue: props.value,
      disabled: props.disabled
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleHoverChange = this.handleHoverChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
        hoverValue: nextProps.hoverValue
      });
    }
  }

  handleChange(value) {
    if (value[0] !== undefined && value[1] !== undefined) {
      const filter = { type: 'interval', start: value[0], end: value[1] };
      this.setState({ value });
      this.props.onClick(filter);
    }
  }

  handleHoverChange(hoverValue) {
    this.setState({ hoverValue });
  }

  render() {
    const state = this.state;
    const calendar = (
      <RangeCalendar
        hoverValue={state.hoverValue}
        onHoverChange={this.handleHoverChange}
        showWeekNumber={false}
        dateInputPlaceholder={['start', 'end']}
        defaultValue={[now, now.clone().add(1, 'months')]}
        locale={es ? esES : enUS}
        showToday
        showClear
        showOk
        format={formatStr}
        disabledTime={disabledTime}
        timePicker={timePickerElement}
      />
    );

    const placeHolderSelectRange = this.props.intl.formatMessage({
      id: 'lockers.selectRange'
    });

    return (
      <div>
        <Picker
          disabled={state.disabled}
          value={state.value}
          onChange={this.handleChange}
          animation="slide-up"
          calendar={calendar}
        >
          {({ value }) => (
            <span>
              <FormControl
                type="text"
                name="picker"
                placeholder={
                  value.length === 0 || isValidRange(value)
                    ? placeHolderSelectRange
                    : 'Must be the final date greater than now'
                }
                readOnly
                required
                value={
                  isValidRange(value)
                    ? `${format(value[0])} - ${format(value[1])}`
                    : ''
                }
              />
            </span>
          )}
        </Picker>
      </div>
    );
  }
}
/**
 * @type {{params: *}}
 */

IntervalCalendar.defaultProps = {
  value: [],
  hoverValue: []
};

export default injectIntl(IntervalCalendar);
