import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends Component {

  static propTypes = {
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
  }

  render() {
    const { input, label, style, meta: { touched, error, warning } } = this.props;

    return (
      <div className="pull-left" style={style}>
        <label className="checkbox-inline"><input {...input} type={"checkbox"} /><b>{label}</b>
          {touched && ((error || warning) && <div className="alert alert-warning alerta">{error || warning}</div>)}
        </label>
      </div>
    );
  }
}
