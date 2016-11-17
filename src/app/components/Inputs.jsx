import React from 'react';
import Select from 'react-select';
import Output from './Output.jsx'
import 'react-select/dist/react-select.css';

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

const STATES = require('../assets/data/states');
const JOBS = require('../assets/data/jobs');
const STATE_AREAS = require('../assets/data/state_areas.js');
const YEARS = require('../assets/data/years');
const MONTHS = require('../assets/data/months');

class Inputs extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			job: '_____',
			state: null,
			area: '_____',
			year: 2006,
			month: 'January',
			salary_start:'34000',
			salary_current:'48000',
			status: 'initial'
		};

		this.sliderChange = this.sliderChange.bind(this);
	}

	dropdownChange(name, e) {
		let change = {};
		change[name] = e.value;
		this.setState(change);
	}

	sliderChange(e) {
		let target = e.target.id;

		if (target === 'sal_curr') {
			this.setState({salary_current: e.target.value});
		} else {
			this.setState({salary_start: e.target.value});
		}

		// Maybe not the best but works for now.  Test more
		if (this.state.job && this.state.salary_start !== '34000' && this.state.salary_current !== '48000') {
			this.setState({status: 'ready'})
		} 
		else return;
		
	}

	componentDidUpdate() {	
		if (this.state.status === 'initial') {
			this.setState({status: 'updated'});
		}
	}


	formatDollars(amount) {
		let number = amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		return number;
	}

	render() {

		let metroOptions = null;

		if (this.state.state) {
			metroOptions = STATE_AREAS[this.state.state];
			$('#metroArea').slideDown(400);
		};

		let currFormat = this.formatDollars(this.state.salary_current);
		let startFormat = this.formatDollars(this.state.salary_start);

		return (
			<div className="container-fluid">
				<Col xs={12} md={4}>
					<div className="inputBlock">
						{/* Industry Block */}
						<Row>
							<Col xs={5}>
								<h3 className="sectionHead"> Your Work </h3>
							</Col>
							<Col xs={7} className="selector">
								<Select
									name="form-field-name"
									options={JOBS['titles']}
									value={this.state.job}
									clearable={false}
									placeholder="Select job"
									onChange={this.dropdownChange.bind(this, 'job')}
								/>
							</Col>
						</Row>

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

						{/* Date Block */}
						<Row>
							<Col xs={12}>
								<h3 className="sectionHead"> When You Started Work </h3>
							</Col>
							<Col xs={5} className="selector">
								<Select
									name="form-field-name"
									options={YEARS['YEARS']}
									value={this.state.year}
									clearable={false}
									placeholder="Select Year"
									onChange={this.dropdownChange.bind(this,'year')}
								/>
							</Col>						
							<Col xs={7} className="selector">
								<Select
									name="form-field-name"
									options={MONTHS['MONTHS']}
									value={this.state.month}
									clearable={false}
									placeholder="Select Month"
									onChange={this.dropdownChange.bind(this,'month')}
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

						{/* Salary Start Block */}
						<Row>
							<Col xs={12}>
								<h3 className="sectionHead"> Starting Salary: ${startFormat}</h3>
							</Col>
							<Col xs={12}className="slideStart">
								<input
									id="sal_start"
									type="range"
									min="0" max="200000"
									value={this.state.salary_start}
									onChange={this.sliderChange}
									step="1000"
								/>
							</Col>
						</Row>
					</div>
				</Col>
				<Col xs={12} md={8}>
					<Output 
						job={this.state.job} 
						state={this.state.state} 
						area={this.state.area} 
						salary_current={this.state.salary_current} 
						status={this.state.status} 
					/>
				</Col>
			</div>
			)
	}
}

export default Inputs;