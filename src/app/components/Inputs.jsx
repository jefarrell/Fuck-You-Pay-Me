import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';



class Inputs extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			input1: '',
			input2: '',
			input3: ''
		};
		this.textChange = this.textChange.bind(this);
	}

	handleChange(name, e) {
		let change = {};
		change[name] = e.value;
		this.setState(change);
	}

	textChange(e) {
		this.setState({input3: e.target.value})
	}

	render() {

		let options = [
			{value: 'one', label: 'One'},
			{value: 'two', label: 'Two'},
			{value: 'three', label: 'Three'},
			{value: 'four', label: '4'}
		];

		let tester = null;
		if (this.state.input2) {
			tester = <h3> here now </h3>
		}

		console.log(this.state)
		
		return (
			<div className="container-fluid">
				<div className="section">
					<div className="row">
						<div className="col-xs-4">
							<h3 className="sectionHead"> First Thing </h3>
						</div>
						<div className="col-xs-8">
							<Select
								name="form-field-name"
								options={options}
								value={this.state.input1}
								clearable={false}
								//onChange={this.handleChange}
								onChange={this.handleChange.bind(this, 'input1')}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-4">
							<h3 className="sectionHead"> Second Thing </h3>
						</div>
						<div className="col-xs-8">
							<Select
								name="form-field-name"
								options={options}
								value={this.state.input2}
								clearable={false}
								//onChange={this.handleChange}
								onChange={this.handleChange.bind(this, 'input2')}
							/>
						</div>
					</div>
					{tester}
					<div className="row">
						<div className="col-xs-4">
							<h3 className="sectionHead"> Third Thing </h3>
						</div>
						<div className="col-xs-8">
							<div className="input-group">
								<span className="input-group-addon">$</span>
								<input
									type="text"
									className="form-control"
									placeholder="Your Salary"
									value={this.state.input3}
									onChange={this.textChange}
								/>
							</div>							
						</div>
					</div>
				</div>
			</div>
			)
	}


}

export default Inputs;