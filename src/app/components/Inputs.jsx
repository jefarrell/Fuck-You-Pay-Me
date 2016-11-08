import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';



const Slider = require('rc-slider');
require('rc-slider/assets/index.css');

const STATES = require('../assets/data/states');
const JOBS = require('../assets/data/jobs');
const STATE_AREAS = require('../assets/data/state_areas.js');


class Inputs extends React.Component {

	constructor(props) {
		super(props);
		let value = new Date().toISOString();
		this.state = {
			job: '',
			state: '',
			area: '',
			startDate: value,
			salary_start:'',
			salary_current:''
		};
		this.dateChange = this.dateChange.bind(this);
	}

	handleChange(name, e) {
		let change = {};
		change[name] = e.value;
		this.setState(change);
	}

	dateChange(date) {
		this.setState({startDate: date});
	}

	formatDollars(amount) {
		let number = amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		return '$'+number;
	}

	render() {

		let metroOptions = null;

		if (this.state.state) {
			metroOptions = STATE_AREAS[this.state.state];
			$('#metroArea').slideDown(400);
		};

		console.log(this.state)

		return (

			<div className="container-fluid">
				<div className="section">

					{/* Industry Block */}
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
								onChange={this.handleChange.bind(this, 'job')}
							/>
						</div>
					</div>

					{/* State Block */}
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

					{/* Area Block */}
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

					{/* Date Block */}
					<div className="row">
						<div className="col-xs-6">
							<h3 className="sectionHead"> When Did You Start? </h3>
						</div>
						<div className="col-xs-6 selector">
						</div>
					</div>
					
					{/* Salary Start Block*/}
					<div className="row">
						<div className="col-xs-6">
							<h3 className="sectionHead"> What was your Starting Salary? </h3>
						</div>
						<div className="col-xs-1 slideStart" id="lowerRange">0</div>
						<div className="col-xs-4 slideStart">
							<Slider 
								tipTransitionName="rc-slider-tooltip-zoom-down"
								min={0}
								max={200000}
								step={1000}
								tipFormatter={this.formatDollars}
							/>
						</div>
						<div className="col-xs-1 slideStart" id="upperRange">200k</div>
					</div>

					{/* Salary Now Block */}
					<div className="row">
						<div className="col-xs-6">
							<h3 className="sectionHead"> What's Your Current Salary? </h3>
						</div>
						<div className="col-xs-1 slideStart" id="lowerRange">0</div>
						<div className="col-xs-4 slideStart">
							<Slider 
								tipTransitionName="rc-slider-tooltip-zoom-down"
								min={0}
								max={200000}
								step={1000}
								tipFormatter={this.formatDollars}
							/>
						</div>
						<div className="col-xs-1 slideStart" id="upperRange">200k</div>
					</div>

				</div>
			</div>
			)
	}


}

export default Inputs;