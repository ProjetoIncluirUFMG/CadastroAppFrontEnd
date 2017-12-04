import React, { Component } from 'react';
import PropTypes from 'prop-types'

import './CadastroProvaDeNivelamento.css';

class CadastroProvaDeNivelamento extends Component {

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
	}

	render() {
		return (
			<div className="cadastro_prova_de_nivelamento">
        cadastro_prova_de_nivelamento
			</div>
		);
	}
}

export default CadastroProvaDeNivelamento;
