import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

function randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

class Feature extends Component {

	constructor(props) {
		super(props);
		this.state = {
			message: ""
		};
	}

	componentWillMount() {
		this.props.fetchMessage();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({message: nextProps.message})
	}

	changeMessage() {
		this.setState({message: randomString()})
	}

	render() {
		return (
			<div>
				{this.state.message} <br />
				<button onClick={this.changeMessage.bind(this)}> Change message</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);
