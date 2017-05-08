import React from 'react';
import { Component } from 'react';
import Cabecalho from './cabecalho';

export default class App extends Component {
  render() {
    return (
      <div>
        <Cabecalho />
        {this.props.children}
      </div>
    );
  }
}