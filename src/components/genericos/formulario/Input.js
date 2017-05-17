import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Input extends Component {

  static propTypes = {
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
  }

  render() {
    const { input, label, type, style, meta: { touched, error, warning } } = this.props;
    
    if (type === 'radio') {
      return (
        <label className="radio-inline"><input {...input} type={type} /> {label}</label>
      );
    } else if (type === 'checkbox') {
      return (
        <div className="pull-left" style={style}>
          <label className="checkbox-inline"><input {...input} type={type} /><b>{label}</b>
            {touched && ((error || warning) && <div className="alert alert-warning alerta">{error || warning}</div>)}
          </label>
        </div>
      );
    } else {
      return (
        <div className="pull-left" style={style}>
          <label>{label}</label>
          <fieldset className="form-group">
            <input className="form-control" {...input} placeholder={label} type={type}/>
            {touched && ((error || warning) && <div className="alert alert-warning alerta">{error || warning}</div>)}
          </fieldset>
        </div>
      );
    }
  }
}

export default Input;