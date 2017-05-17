import React, { Component } from 'react';

export default class RadioGroup extends Component {
    render() {
        const { input, label, options, style, meta: { touched, error, warning } } = this.props;

        return (
            <div className="pull-left" style={style}>
                <label>{label}</label>
                <fieldset className="form-group">
                    {options.map(o => <label className="radio-inline" key={o.value}><input type="radio" {...input} value={o.value} checked={o.value === input.value} /> {o.title}</label>)}
                    {touched && ((error || warning) && <div className="alert alert-warning alerta">{error || warning}</div>)}
                </fieldset>
            </div>
        );
    }
}