import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import './Cabecalho.css';

import * as actions from '../../actions/autenticacao';

class Cabecalho extends Component {

  static propTypes = {
		autenticado: PropTypes.bool.isRequired,
    logoutUsuario: PropTypes.func.isRequired,
    logoImage: PropTypes.string.isRequired,

		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      localizacaoAtual: "/"
    }
  }

  componentDidMount() {
    this.setState({
      localizacaoAtual: this.props.location.pathname
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        localizacaoAtual: nextProps.location.pathname
      });
    }
  }

  renderizarOpcoes() {
    if (this.props.autenticado) {
      const usuario = JSON.parse(localStorage.getItem('piUser'));
      return (
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="">           {usuario.nome}&nbsp;<span className="caret"></span>
          </a>
          <ul className="dropdown-menu">
            <li className="nav-item" key={2}>
              <a href="" className="nav-link"
                onClick={this.props.logoutUsuario}>Sair</a>
            </li>
          </ul>
        </li>);
    } else {
      return [
        <li className="nav-item opcao-menu" key={1}>
          <Link className="nav-link" to="/login" data-toggle="collapse" data-target="#navbar">
          {this.state.localizacaoAtual === '/login' ? <span className="selecionado">Login</span> : <span className="nao-selecionado">Login</span>}
          </Link>
        </li>,
        <li className="nav-item opcao-menu" key={2}>
          <Link className="nav-link" to="/cadastro" data-toggle="collapse" data-target="#navbar">
          {this.state.localizacaoAtual === '/cadastro' ? <span className="selecionado">Cadastro</span> : <span className="nao-selecionado">Cadastro</span>}
          </Link>
        </li>
      ];
    }

  }

  render() {

    return (
      <span className="cabecalho">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand"><img alt="Logo Projeto Incluir" src={this.props.logoImage} height={"100%"}/></Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav pull-right">
                {this.renderizarOpcoes()}
              </ul>
            </div>
          </div>
        </nav>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    autenticado: state.autenticacao.autenticado,
    usuario: state.autenticacao.usuario,
  };
}

export default connect(mapStateToProps, actions)(Cabecalho);
