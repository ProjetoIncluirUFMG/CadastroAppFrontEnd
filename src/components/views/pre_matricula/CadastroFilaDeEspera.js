import React, { Component } from 'react';
import PropTypes from 'prop-types'

import './CadastroFilaDeEspera.css';

class CadastroFilaDeEspera extends Component {

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
	}

	render() {
		return (
			<div className="cadastro_fila_de_espera">
        cadastro_fila_de_espera
			</div>
		);
	}
}


export default CadastroFilaDeEspera;
