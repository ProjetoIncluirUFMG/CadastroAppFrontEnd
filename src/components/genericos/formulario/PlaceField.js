import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const AutocompleteItem = ({ formattedSuggestion }) => (
  <div>
    <strong>{ formattedSuggestion.mainText }</strong>{' '}
    <small>{ formattedSuggestion.secondaryText }</small>
  </div>
);

export default class PlaceField extends Component {

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
					/>
					{touched && (error && <div className="alert alert-warning alerta">{error}</div>)}
				</fieldset>
			</div>
		);
	}
}
