import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';



class Inputs extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			input1: '',
			input2: ''
		};
	}

	handleChange(name, e) {
		let change = {};
		change[name] = e.value;
		this.setState(change);
	}


	render() {

		let options = [
			{value: 'one', label: 'One'},
			{value: 'two', label: 'Two'},
			{value: 'three', label: 'Three'},
			{value: 'four', label: '4'}
		];

		return (
			<div className="section">
				<div>
					<h3 className="sectionHead" value="First Thing"/>
					<Select
						name="form-field-name"
						options={options}
						value={this.state.input1}
						onChange={this.handleChange.bind(this, 'input1')}
					/>
				</div>
				<div>
					<h3 className="sectionHead" value="Second Thing"/>
					<Select
						name="form-field-name"
						options={options}
						value={this.state.input2}
						onChange={this.handleChange.bind(this, 'input2')}
					/>
				</div>
			</div>
			)
	}


}

export default Inputs;