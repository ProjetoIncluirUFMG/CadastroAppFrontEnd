import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class renderDatePicker extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
		style: PropTypes.object
  }

  static defaultProps = {
    label: ''
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.props.input.onChange(moment(date).format('DD-MM-YYYY'))
  }

  render () {
		const { input, label, style, meta: { touched, error }, ...rest } = this.props;

    return (
			<div className="pull-left" style={style}>
        <label>{label}</label>
        <fieldset className="form-group">
        	<DatePicker
	          {...input}
						{...rest}
						locale="pt-br"
						peekNextMonth
				    showMonthDropdown
				    showYearDropdown
				    dropdownMode="select"
	          placeholder={label}
	          dateFormat="DD-MM-YYYY"
	          selected={input.value ? moment(input.value, 'DD-MM-YYYY') : null}
	          onChange={this.handleChange}
	        />
					{touched && (error && <div className="alert alert-warning alerta">{error}</div>)}
				</fieldset>
			</div>
    )
  }
}
