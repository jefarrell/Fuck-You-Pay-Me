import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";


import DatePicker from 'react-bootstrap-date-picker';


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
					<Row>
						<Col xs={6}>
							<h3 className="sectionHead"> You Work As </h3>
						</Col>
						<Col xs={6} className="selector">
							<Select
								name="form-field-name"
								options={JOBS['titles']}
								value={this.state.job}
								clearable={false}
								onChange={this.handleChange.bind(this, 'job')}
							/>
						</Col>
					</Row>

					{/* State Block */}
					<Row>
						<Col xs={6}>
							<h3 className="sectionHead"> You live in </h3>
						</Col>
						<Col xs={6} className="selector">
							<Select
								name="form-field-name"
								options={STATES['US']}
								value={this.state.state}
								clearable={false}
								//onChange={this.handleChange}
								onChange={this.handleChange.bind(this, 'state')}
							/>
						</Col>
					</Row>

					{/* Area Block */}
					<Row id="metroArea">
						<Col xs={6}>
							<h3 className="sectionHead"> Which Part? </h3>
						</Col>
						<Col xs={6} className="selector">
							<Select
								name="form-field-name"
								options={metroOptions}
								value={this.state.area}
								clearable={false}
								//onChange={this.handleChange}
								onChange={this.handleChange.bind(this, 'area')}
							/>
						</Col>
					</Row>

					{/* Date Block */}
					<Row>
						<Col xs={6}>
							<h3 className="sectionHead"> When Did You Start? </h3>
						</Col>
						<Col xs={6} className="selector">
							<DatePicker />
						</Col>
					</Row>
					
					{/* Salary Start Block*/}
					<Row>
						<Col xs={6}>
							<h3 className="sectionHead"> What was your Starting Salary? </h3>
						</Col>
						<Col xs={1} className="slideStart" id="lowerRange">0</Col>
						<Col xs={4} className="slideStart">
							<Slider 
								tipTransitionName="rc-slider-tooltip-zoom-down"
								min={0}
								max={200000}
								step={1000}
								tipFormatter={this.formatDollars}
							/>
						</Col>
						<Col xs={1} className="slideStart" id="upperRange">200k</Col>
					</Row>

					{/* Salary Now Block */}
					<Row>
						<Col xs={6}>
							<h3 className="sectionHead"> What's Your Current Salary? </h3>
						</Col>
						<Col xs={1} className="slideStart" id="lowerRange">0</Col>
						<Col xs={4} className="slideStart">
							<Slider 
								tipTransitionName="rc-slider-tooltip-zoom-down"
								min={0}
								max={200000}
								step={1000}
								tipFormatter={this.formatDollars}
							/>
						</Col>
						<Col xs={1} className="slideStart" id="upperRange">200k</Col>
					</Row>

				</div>
			</div>
			)
	}

//<DatePicker value={this.state.startDate} onChange={this.dateChange} />
}

export default Inputs;