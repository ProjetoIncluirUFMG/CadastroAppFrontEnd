import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

const AutocompleteItem = ({ formattedSuggestion }) => (
  <div>
    <strong>{ formattedSuggestion.mainText }</strong>{' '}
    <small>{ formattedSuggestion.secondaryText }</small>
  </div>
);

export default class PlaceField extends Component {

	static propTypes = {
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
  }

	render() {
		const { input, label, placeholder, style, meta: { touched, error } } = this.props;

		const cssClasses = {
	    root: 'form-group',
	    input: 'form-control',
	    autocompleteContainer: 'autocomplete-container'
	  };

		input.placeholder = placeholder;

		return (
			<div className="pull-left" style={style}>
        <label>{label}</label>
        <fieldset className="form-group">
					<PlacesAutocomplete
						classNames={cssClasses}
						autocompleteItem={AutocompleteItem}
						inputProps={input}
            autocomplete={"off"}
					/>
					{touched && (error && <div className="alert alert-warning alerta">{error}</div>)}
				</fieldset>
			</div>
		);
	}
}
