import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {

  static propTypes = {
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    obrigatorio: PropTypes.bool,
    style: PropTypes.object.isRequired
  }

  render() {
    const { input, label, placeholder, obrigatorio, type, style, meta: { touched, error, warning } } = this.props;

    return (
      <div className="pull-left" style={style}>
        <label>{label} {obrigatorio ? <span style={{color: 'red'}}>*</span> : <span/>}</label>
        <fieldset className="form-group">
          <input className="form-control" {...input} placeholder={placeholder} type={type}/>
          {touched && ((error || warning) && <div className="alert alert-warning alerta">{error || warning}</div>)}
        </fieldset>
      </div>
    );
  }
}
