import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const logoImgSrc = '../../../images/logo-projeto-incluir.png';

class Cabecalho extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      currentLocation: "/"
    }
  }

  componentDidMount() {
    this.setState({
      currentLocation: this.props.location.pathname
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({
        currentLocation: nextProps.location.pathname
      });
    }
  }

  renderizarOpcoes() {
    if (this.props.autenticado) {
      return (
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/logout">Sair</Link>
        </li>);
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">
          {this.state.currentLocation === '/login' ? <b>Login</b> : "Login"}
          </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/cadastro">
          {this.state.currentLocation === '/cadastro' ? <b>Cadastro</b> : "Cadastro"}
          </Link>
        </li>
      ];
    }

  }

  render() {

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand"><img src={logoImgSrc} height={"100%"}/></Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav pull-right">
              {this.renderizarOpcoes()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    autenticado: state.autenticacao.autenticado
  };
}

export default connect(mapStateToProps)(Cabecalho);
