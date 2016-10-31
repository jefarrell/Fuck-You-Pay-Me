import React from 'react';
const Select = require('react-select');
import 'react-select/dist/react-select.css'

let options = [
	{value: 'one', label: 'One'},
	{value: 'two', label: 'Two'},
	{value: 'three', label: 'Three'},
	{value: 'four', label: '4'}
];

class Inputs extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentValue: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(val) {
		this.setState({currentValue: val});
	}


	render() {
		return (
			<div>
				<Select
					name="form-field-name"
					options={options}
					value={this.state.currentValue}
					onChange={this.handleChange}
				/>
			</div>
			)
	}


}

export default Inputs;