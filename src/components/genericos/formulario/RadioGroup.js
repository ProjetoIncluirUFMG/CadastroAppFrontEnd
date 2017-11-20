import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RadioGroup extends Component {

	static propTypes = {
		meta: PropTypes.object.isRequired,
		input: PropTypes.object.isRequired,
		label: PropTypes.string.isRequired,
		options: PropTypes.array.isRequired,
    obrigatorio: PropTypes.bool,
		style: PropTypes.object.isRequired
	}

  render() {
      const { input, label, options, obrigatorio, style, meta: { touched, error, warning } } = this.props;

      return (
          <div className="pull-left" style={style}>
              <label>{label} {obrigatorio ? <span style={{color: 'red'}}>*</span> : <span/>}</label>
              <fieldset className="form-group">
                  {options.map(o => <label className="radio-inline" key={o.value}><input type="radio" {...input} value={o.value} checked={o.value === input.value} /> {o.title}</label>)}
                  {touched && ((error || warning) && <div className="alert alert-warning alerta">{error || warning}</div>)}
              </fieldset>
          </div>
      );
  }
}
