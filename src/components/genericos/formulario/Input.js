import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Input extends Component {

  static propTypes = {
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tamanho: PropTypes.string.isRequired
  }

  render() {
    const { input, label, type, tamanho, meta: { touched, error, warning } } = this.props;
    return (
      <div className="pull-left" style={{width: tamanho}}>
        <label>{label}</label>
        <fieldset className="form-group">
          <input className="form-control" {...input} placeholder={label} type={type}/>
          {touched && ((error || warning) && <div className="alert alert-warning alerta">{error || warning}</div>)}
        </fieldset>
      </div>
    );
  }
}

export default Input;