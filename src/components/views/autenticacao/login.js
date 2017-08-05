import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import * as actions from '../../../actions/autenticacao';

import * as validacoes from '../../genericos/formulario/utils/validacoesDeFormulario';
import Input from '../../genericos/formulario/Input';
import DropDown from '../../genericos/formulario/DropDown';

class Login extends Component {

	static propTypes = {
		mensagemDeErro: PropTypes.string,
		loginUsuario: PropTypes.func.isRequired,
    	usuarioAutenticado: PropTypes.bool,

		valid: PropTypes.bool.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		pristine: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,

		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	submeterFormulario(formProps) {
    this.props.loginUsuario(formProps);
  }

  componentWillReceiveProps(nextProps) {
    // Redirecionar usuario para pagina principal depois do login
    if (nextProps.usuarioAutenticado) this.props.history.push('/');
  }

	mostrarAlertas() {
    if (this.props.mensagemDeErro) {
      return (
        <div>
					<br />
	        <div className="erro pull-left alert alert-danger">
	          <strong>Oops!</strong> {this.props.mensagemDeErro}
	        </div>
				</div>
      );
    }
  }

  render() {
    const { valid, handleSubmit, pristine, submitting } = this.props

    const emProgresso = !valid || pristine || submitting;

    return (
			<div className="login">
        <form onSubmit={handleSubmit(this.submeterFormulario.bind(this))}>
					<Field
						label="Email"
						name="email"
						type="text"
						component={Input}
						validate={[
							validacoes.obrigatorio,
							validacoes.email
						]}
						style={{width: "100%"}}
					/>

					<Field
						label="Senha"
						name="senha"
						type="password"
						component={Input}
						validate={[
							validacoes.obrigatorio,
							validacoes.valorMinimoDeCaracteres(8),
							validacoes.valorMaximoDeCaracteres(12)
						]}
						style={{width: "100%"}}
					/>

	        {this.mostrarAlertas()}

					<div className="clearfix top_space">
            <button type="submit" className={'btn btn-space btn-primary ' + (emProgresso ? 'disabled' : '')} disabled={emProgresso}>Login</button>
						<button className="btn btn-default" onClick={() => this.props.history.push('/esqueciSenha')}>Esqueci minha senha</button>
          </div>
	      </form>
			</div>
    )
  }
}

const LoginForm = reduxForm({
  form: 'login'
})(Login)

function mapStateToProps(state) {
  return {
    mensagemDeErro: state.autenticacao.erro,
    usuarioAutenticado: state.autenticacao.autenticado,
  };
}

export default connect(mapStateToProps, actions)(LoginForm);
