import React from 'react';
import Select from 'react-select';
import Output from './Output.jsx'
import 'react-select/dist/react-select.css';

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

let path = '../assets/data/'
const STATES = require('../assets/data/states.js');
const JOBS = require('../assets/data/jobs.js');
const STATE_AREAS = require('../assets/data/state_areas.js');

// We're going to update this with specific metro area data
let jobPlaceholder = JOBS['titles'];

// Handles all site inputs (dropdowns, sliders)
class Inputs extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			job: '_____',
			state: null,
			area: '_____',
			salary_current:'48000',
			updater: 'no'
		};
		this.sliderChange = this.sliderChange.bind(this);
	}

	// Update states for respective dropdowns
	dropdownChange(name, e) {
		let change = {};
		change[name] = e.value;
		this.setState(change);
	}

	// Update states for sliders
	sliderChange(e) {
		let target = e.target.id;
		this.setState({salary_current: e.target.value});
	}

	formatDollars(amount) {
		let number = amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		return number;
	}

	// This doesn't feel right but it works
	componentDidUpdate(prevProps, prevState) {
		if (this.state.area != prevState.area) {	
			$.getJSON('src/app/assets/data/job_splits/'+this.state.state+'_jobs.json', (data) => {
				jobPlaceholder = data[this.state.area];
				console.log("dataz: ", data);
				console.log("state : ", this.state.state, this.state.area);
				this.setState({updater: 'yes'});
			});
		}
	}

	render() {
		let metroOptions = null;

		// Reveal metro areas dropdown after State selected
		if (this.state.state) {
			metroOptions = STATE_AREAS[this.state.state];
			$('#metroArea').slideDown(400);
		};

		// Formatting numbers to display as dollars
		let currFormat = this.formatDollars(this.state.salary_current);

		return (
			<div className="container-fluid">
				<Col xs={12} md={5}>
					<div className="inputBlock">

						{/* State Block */}
						<Row>
							<Col xs={5}>
								<h3 className="sectionHead"> Where You Live </h3>
							</Col>
							<Col xs={7} className="selector">
								<Select
									name="form-field-name"
									options={STATES['US']}
									value={this.state.state}
									clearable={false}
									placeholder="Select state"
									onChange={this.dropdownChange.bind(this, 'state')}
								/>
							</Col>
						</Row>

						{/* Area Block */}
						<Row id="metroArea">
							<Col xs={5}>

							</Col>
							<Col xs={7} className="selector">
								<Select
									name="form-field-name"
									options={metroOptions}
									value={this.state.area}
									clearable={false}
									placeholder="Select area"
									onChange={this.dropdownChange.bind(this, 'area')}
								/>
							</Col>
						</Row>
						{/* Industry Block */}
						<Row>
							<Col xs={5}>
								<h3 className="sectionHead"> Your Work </h3>
							</Col>
							<Col xs={7} className="selector">
								<Select
									name="form-field-name"
									options={jobPlaceholder}
									value={this.state.job}
									clearable={false}
									placeholder="Select job"
									onChange={this.dropdownChange.bind(this, 'job')}
								/>
							</Col>
						</Row>						

						
						{/* Salary Now Block*/}
						<Row>
							<Col xs={12}>
								<h3 className="sectionHead"> Current Salary: ${currFormat}</h3>
							</Col>
							<Col xs={12} className="slideStart">
								<input
									id="sal_curr"
									type="range"
									min="0" max="200000"
									value={this.state.salary_current}
									onChange={this.sliderChange}
									step="1000"
								/>
							</Col>
						</Row>

					</div>
				</Col>
				<Col md={1} xs={0}></Col>
				<Col xs={12} md={6}>
					<Output 
						job={this.state.job} 
						state={this.state.state} 
						area={this.state.area} 
						salary_current={this.state.salary_current} 
					/>
				</Col>
			</div>
			)
	}
}

export default Inputs;