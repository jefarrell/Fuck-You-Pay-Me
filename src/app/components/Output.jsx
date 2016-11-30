import React from 'react';
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import { TwitterButton } from 'react-social';

// Handle Certificate output
class Output extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			job: '_____',
			state: '',
			area: '_____',
			salary_current:'',
			salary_data: '_____',
			salary_difference: '',
			status: 'initial'
		};
	}

	// Update state as we receive props from Input
	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {
			for (var property in nextProps) {
				if (nextProps.hasOwnProperty(property)){
					this.setState(nextProps);
				}
			}

			// Once right fields are updated, check the data
			if (this.state.job !== '_____' && this.state.area !=='_____' && this.state.salary_current !== '48000') {
				this.calculatePayment(this.state.state, this.state.area);
			}

		} else return
	}

	formatDollars(amount) {
		let number = amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		return number;
	}

	// Check the data
	calculatePayment(stateName, areaName) {

		// Load JSON file for appropriate state
		$.getJSON('src/app/assets/data/state_splits/'+stateName+'_salaries.json', (data) => {
			// See if the job exists for that metro area
			if (data[areaName][this.state.job]) {
				// Checking salary input by user against salary in data
				let current = parseInt(this.state.salary_current);
				if (current < parseInt(data[areaName][this.state.job])) {
					
					this.setState({
						salary_data: parseInt(data[areaName][this.state.job]),
						status: 'underpaid'
					});

				} else if (current > parseInt(data[areaName][this.state.job])) {
					
					let diff = current-parseInt(data[areaName][this.state.job]);
					this.setState({
						salary_data: parseInt(data[areaName][this.state.job]),
						salary_difference: diff,
						status: 'paid'
					});
				}
			}
		});
	}


	render() {
		// Make several templates to render (initial, underpaid, paid)
		// Swap them in and out based on result of calculatePayment()
		let status = 
			<Col xs={12} className="initialBlock"></Col>


		if (this.state.status === 'underpaid') {
			
			let salary_data = this.formatDollars(this.state.salary_data);
			
			status =
				<Col xs={12} className="underBlock">
					<Col xs={12} className="underContent">
						<p>{this.state.job} in the {this.state.area} area make an average
						of ${salary_data} per year, according to the Bureau of Labor Statistics.</p>
					</Col>
				</Col>
		

		} else if (this.state.status === 'paid') {

			let salary_data = this.formatDollars(this.state.salary_data);
			let salary_diff = this.formatDollars(this.state.salary_difference);
			
			status =
				<Col xs={12} className="paidBlock">
					<Col xs={12} className="paidContent">
						<p>You're ${salary_diff} ahead of the game.  {this.state.job} in the {this.state.area} area make an average
						of ${salary_data} per year, according to the Bureau of Labor Statistics.</p>
					</Col>
				</Col>
		}

		return(

			<div>
				<Row className="certificateBlock">
					{status}
				</Row>
				<Col className="socialBlock">
				    <a className={"fb-xfbml-parse-ignore socialShare"} target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.kickstarter.com%2Fprojects%2Fgotenna%2F257342308&t=">
                        <i className={"fa fa-facebook fa-3x"} aria-hidden="true"></i>                    
                    </a>
					<TwitterButton 
                        message="{tweet}"
                        url=""
                        element="a"
                        className="socialShare">
                        <i className={"fa fa-twitter fa-3x"} aria-hidden="true"/>
                    </TwitterButton>
                    <a 
	                    href=""
	                    target="_blank" title="Send email">
	                    <i className={"fa fa-envelope fa-3x"} aria-hidden="true"></i>
                    </a>
				</Col>
			</div>
			)
	}
}


export default Output;