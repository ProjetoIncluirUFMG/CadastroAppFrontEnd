import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  console.log(`--------`)
  console.log(input)
  console.log(`label: ${label}`)
  console.log(`type: ${type}`)
  console.log(`touched: ${touched}`)
  console.log(`error: ${error}`)
  console.log(`warning: ${warning}`)
  console.log(`--------`)

  return (<div>
    <label>{label}</label>
    <fieldset className="form-group">
      <input className="form-control" {...input} placeholder={label} type={type}/>
      {touched && ((error && <div className="error">{error}</div>) || (warning && <div className="warning">{warning}</div>))}
    </fieldset>
  </div>);
}

class Signin extends Component {

  submitForm({email, password}) {
    console.log(email, password);
    const history = this.props.history;
    this.props.signinUser({email, password, history});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
        <Field name="email" type="text" 
          component={renderField} 
          label="Email"
          validate={email}
          warn={aol}
        />
        <Field name="password" type="password" component={renderField} label="Password"/>
        <br />
        {this.renderAlert()}
        <div>
          <button type="submit" className={'btn btn-primary ' + (pristine || submitting ? 'disabled' : '')} disabled={pristine || submitting}>Sign in</button>
          <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }
}

const SigninForm = reduxForm({
  form: 'signin'  // a unique identifier for this form
})(Signin)

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(SigninForm);
