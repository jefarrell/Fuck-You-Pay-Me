import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const STATES = require('../assets/data/states');
const JOBS = require('../assets/data/jobs');
const STATE_AREAS = require('../assets/data/state_areas.js');

class Inputs extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			job: '',
			state: '',
			area: '',
			salary_start:'',
			salary_current:''
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

		let metroOptions = null;

		if (this.state.state) {
			console.log(STATE_AREAS[this.state.input2])
			metroOptions = STATE_AREAS[this.state.state];
			$('#metroArea').slideDown(400);
		};

		console.log(this.state)

		return (

			

			<div className="container-fluid">
				<div className="section">
					<div className="row">
						<div className="col-xs-6">
							<h3 className="sectionHead"> You Work As </h3>
						</div>
						<div className="col-xs-6 selector">
							<Select
								name="form-field-name"
								options={JOBS['titles']}
								value={this.state.job}
								clearable={false}
								//onChange={this.handleChange}
								onChange={this.handleChange.bind(this, 'job')}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-6">
							<h3 className="sectionHead"> You live in </h3>
						</div>
						<div className="col-xs-6 selector">
							<Select
								name="form-field-name"
								options={STATES['US']}
								value={this.state.state}
								clearable={false}
								//onChange={this.handleChange}
								onChange={this.handleChange.bind(this, 'state')}
							/>
						</div>
					</div>
					<div className="row" id="metroArea">
						<div className="col-xs-6">
							<h3 className="sectionHead"> Which Part? </h3>
						</div>
						<div className="col-xs-6 selector">
							<Select
								name="form-field-name"
								options={metroOptions}
								value={this.state.area}
								clearable={false}
								//onChange={this.handleChange}
								onChange={this.handleChange.bind(this, 'area')}
							/>
						</div>
					</div>
					
					<div className="row">
						<div className="col-xs-6">
							<h3 className="sectionHead"> What was your Starting Salary? </h3>
						</div>
						<div className="col-xs-6 selector">
							<div className="input-group">
								<span className="input-group-addon">$</span>
								<input
									type="text"
									className="form-control"
									placeholder="Your Salary"
									value={this.state.salary_start}
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