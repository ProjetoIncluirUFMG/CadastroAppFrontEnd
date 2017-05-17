import React, { Component } from 'react';
import PropTypes from 'prop-types'

class DropDown extends Component {

  static propTypes = {
    opcoes: PropTypes.array.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
  }

  renderizarValidacao = (touched, error, warning) => {
    return touched && ((error || warning) && <div className="alert alert-warning alerta">{error || warning}</div>)
  }

  renderizarOpcoes = (opcao) => (
    <option key={opcao} value={opcao}>{opcao}</option>
  )

  render() {
    const { input, label, style, opcoes, meta: { touched, error, warning } } = this.props;
    return (
      <div className="pull-left" style={style}>
        <label>{label}</label>
        <fieldset className="form-group">
          <select className="form-control" {...input}>
            <option value="">Selecionar</option>
            {opcoes.map(this.renderizarOpcoes)}
          </select>
          {this.renderizarValidacao(touched, error, warning)}
        </fieldset>
      </div>
    );
  }
}

export default DropDown;