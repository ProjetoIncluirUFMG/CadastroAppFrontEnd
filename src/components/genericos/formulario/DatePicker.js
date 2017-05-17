import React, { Component } from 'react';

export default class DatePicker extends Component {
    render() {
    	const { input, label, defaultValue, style, meta: { touched, error, warning } } = this.props;

		<div>
			<DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
			{touched && error && <span>{error}</span>}
		</div>
	}
};