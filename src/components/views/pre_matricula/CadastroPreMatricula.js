import React, { Component } from 'react';
import PropTypes from 'prop-types'

import './CadastroPreMatricula.css';

class CadastroPreMatricula extends Component {

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
	}

	render() {
		return (
			<div className="cadastro_pre_matricula">
        cadastro_pre_matricula
			</div>
		);
	}
}

export default CadastroPreMatricula;
