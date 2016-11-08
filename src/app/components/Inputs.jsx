import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";


//import DatePicker from 'react-bootstrap-date-picker';

const STATES = require('../assets/data/states');
const JOBS = require('../assets/data/jobs');
const STATE_AREAS = require('../assets/data/state_areas.js');
const YEARS = require('../assets/data/years');
const MONTHS = require('../assets/data/months');

class Inputs extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			job: '',
			state: '',
			area: '',
			year: '',
			month: '',
			salary_start:'0',
			salary_current:'0'
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
				<div className="section">

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
								placeholder="Select a job"
								onChange={this.dropdownChange.bind(this, 'job')}
							/>
						</Col>
					</Row>

					{/* State Block */}
					<Row>
						<Col xs={5}>
							<h3 className="sectionHead"> You Live In </h3>
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
							<h3 className="sectionHead"> Which Part? </h3>
						</Col>
						<Col xs={7} className="selector">
							<Select
								name="form-field-name"
								options={metroOptions}
								value={this.state.area}
								clearable={false}
								placeholder="Select region"
								onChange={this.dropdownChange.bind(this, 'area')}
							/>
						</Col>
					</Row>

					{/* Date Block */}
					<Row>
						<Col xs={12} md={5}>
							<h3 className="sectionHead"> When You Started Work </h3>
						</Col>
						<Col xs={7} md={4}className="selector">
							<Select
								name="form-field-name"
								options={MONTHS['MONTHS']}
								value={this.state.month}
								clearable={false}
								placeholder="Select Month"
								onChange={this.dropdownChange.bind(this,'month')}
							/>
						</Col>						
						<Col xs={5} md={3}className="selector">
							<Select
								name="form-field-name"
								options={YEARS['YEARS']}
								value={this.state.year}
								clearable={false}
								placeholder="Select Year"
								onChange={this.dropdownChange.bind(this,'year')}
							/>
						</Col>
					</Row>
					
					{/* Salary Now Block*/}
					<Row>
						<Col md={5} xs={12}>
							<h3 className="sectionHead"> Current Salary: ${currFormat}</h3>
						</Col>
						<Col md={7} xs={12} className="slideStart">
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
						<Col md={5} xs={12}>
							<h3 className="sectionHead"> Starting Salary: ${startFormat}</h3>
						</Col>
						<Col md={7} xs={12}className="slideStart">
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
			</div>
			)
	}
}

export default Inputs;