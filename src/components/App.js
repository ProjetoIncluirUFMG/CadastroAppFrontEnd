import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Cabecalho from './genericos/Cabecalho';

import LogoProjetoIncluir from '../assets/logo-projeto-incluir.png';

import './App.css';

class App extends Component {

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};

	render() {

		const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       location: this.props.location,
			 history: this.props.history,
			 match: this.props.match
     })
    );

		return (
			<div className="app">
				<Cabecalho {...this.props} logoImage={LogoProjetoIncluir} />
				<div className="espaco" />
				{childrenWithProps}
			</div>
		);
	}
}

export default withRouter(App);
