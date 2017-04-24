import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength8 = maxLength(8)
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
const passwordsMatch = (password, component) => 
  component.password !== component.passwordConfirm ? 'Invalid repeat password' : undefined;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
  console.log(`--------`)
  console.log(input)
  console.log(`label: ${label}`)
  console.log(`type: ${type}`)
  console.log(`touched: ${touched}`)
  console.log(`error: ${error}`)
  console.log(`--------`)

  return (<div>
    <label>{label}</label>
    <fieldset className="form-group">
      <input className="form-control" {...input} placeholder={label} type={type}/>
      {/*if the two are true, output the last (this is tricky JS)*/}
      {touched && ((error && <div className="error">{error}</div>) || (warning && <div className="warning">{warning}</div>))}
    </fieldset>
  </div>);
}

class Signup extends Component {

  submitForm(formProps) {
    // Call action creator to sign up user (properties with no errors)
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {

    const { error, handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
          <Field name="email" validate={email} type="text" component={renderField} label="Email"/>
          <Field name="password" type="password" 
            validate={maxLength8}
            component={renderField} 
            label="Password"/>
          <Field name="passwordConfirm" type="password"
            validate={[passwordsMatch.bind(this)]} 
            component={renderField} 
            label="Confirm Password"/>
          {this.renderAlert()}
          <div>
            <button type="submit" className={'btn btn-primary ' + (pristine || submitting ? 'disabled' : '')} disabled={pristine || submitting}>Sign up!</button>
            <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
        </form>
      </div>
    );
  }
}

const SignupForm = reduxForm({
  form: 'signup'  // a unique identifier for this form
})(Signup)

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(SignupForm);
