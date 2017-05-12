import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Cabecalho from './genericos/cabecalho';

class App extends Component {

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	render() {
		return (
			<div>
				<Cabecalho {...this.props} />
				<div className="espaco" />
				{this.props.children}
			</div>
		);
	}
}

export default withRouter(App);