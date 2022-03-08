import React from 'react';
import { Button } from 'antd';
import './time-picker-example.css';
import { TimePicker } from 'antd';
import moment from 'moment';
const format = 'HH:mm';

class TimePickerExample extends React.Component {
    onChange(value) {
        console.log(value._i);
    }
    render() {
        return (<div className="TimePickerExample">
            <TimePicker
                defaultValue={moment('12:08', format)}
                format={format}
                onChange={this.onChange}
            />
        </div>);
    }
};

export default TimePickerExample;