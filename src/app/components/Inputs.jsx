import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const STATES = require('../assets/states');
const JOBS = require('../assets/jobs');


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
		
		if (this.state.input2) {
			$('#metroArea').slideDown(400);
		}

		console.log(this.state)


		return (
			<div className="container-fluid">
				<div className="section">
					<div className="row">
						<div className="col-xs-6">
							<h3 className="sectionHead"> You Work As </h3>
						</div>
						<div className="col-xs-6">
							<Select
								name="form-field-name"
								options={JOBS['titles']}
								value={this.state.input1}
								clearable={false}
								//onChange={this.handleChange}
								onChange={this.handleChange.bind(this, 'input1')}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-6">
							<h3 className="sectionHead"> You live in </h3>
						</div>
						<div className="col-xs-6">
							<Select
								name="form-field-name"
								options={STATES['US']}
								value={this.state.input2}
								clearable={false}
								//onChange={this.handleChange}
								onChange={this.handleChange.bind(this, 'input2')}
							/>
						</div>
					</div>
					<div className="row" id="metroArea">
						<div className="col-xs-6">
							<h3 className="sectionHead"> Which Part? </h3>
						</div>
						<div className="col-xs-6">
							<Select
								name="form-field-name"
								options={STATES['US']}
								value={this.state.input2}
								clearable={false}
								//onChange={this.handleChange}
								onChange={this.handleChange.bind(this, 'input2')}
							/>
						</div>
					</div>
					
					<div className="row">
						<div className="col-xs-6">
							<h3 className="sectionHead"> What was your Starting Salary? </h3>
						</div>
						<div className="col-xs-6">
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