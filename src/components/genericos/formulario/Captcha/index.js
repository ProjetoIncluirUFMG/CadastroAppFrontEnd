import React, { Component } from 'react';
import {} from './setup';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';

export default class Captcha extends Component {

	static propTypes = {
    input: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
		apiKey: PropTypes.string.isRequired
  }

	render() {
		const { input, style, apiKey } = this.props;

		return (
			<div className="pull-left" style={style}>
				<ReCAPTCHA
					sitekey={apiKey}
					onChange={input.onChange}
				/>
			</div>
		);
	}

}
