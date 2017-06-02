import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';

export default class Captcha extends Component {

	static propTypes = {
    input: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired
  }

	render() {
		const { input, style } = this.props;

		return (
			<div className="pull-left" style={style}>
				<ReCAPTCHA
					sitekey={"6LepyiMUAAAAAD9ZHsU3hVy6CW4uNRLMPsND6TV7"}
					onChange={input.onChange}
				/>
			</div>
		);
	}

}
