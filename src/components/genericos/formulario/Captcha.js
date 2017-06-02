import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default class Captcha extends Component {

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
