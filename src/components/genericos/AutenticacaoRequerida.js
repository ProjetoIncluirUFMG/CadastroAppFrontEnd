import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComponenteComposto) {
  class AutenticacaoRequerida extends Component {

		static propTypes = {
	    autenticado: PropTypes.bool,
			location: PropTypes.object.isRequired,
			history: PropTypes.object.isRequired
	  }

    componentWillMount() {
      if (!this.props.autenticado) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.autenticado) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComponenteComposto {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { autenticado: state.autenticacao.autenticado };
  }

  return connect(mapStateToProps)(AutenticacaoRequerida);
}
