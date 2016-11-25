import React from 'react';
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import {
	FacebookButton, TwitterButton, EmailButton
} from 'react-social';

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

	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {
			for (var property in nextProps) {
				if (nextProps.hasOwnProperty(property)){
					this.setState(nextProps);
				}
			}
			if (this.state.job !== '_____' && this.state.area !=='_____' && this.state.salary_current !== '48000') {
				this.calculatePayment(this.state.state, this.state.area);
			}

		} else return
	}


	componentDidUpdate() {
		if (this.state.status === 'initial') {
			this.setState({ status: 'updated' });
		}
	}

	calculatePayment(stateName, areaName) {

		$.getJSON('src/app/assets/data/state_splits/'+stateName+'_salaries.json', (data) => {
		
			if (data[areaName][this.state.job]) {
				
				let current = parseInt(this.state.salary_current);

				if (current < parseInt(data[areaName][this.state.job])) {
					console.log('less than: ', parseInt(data[areaName][this.state.job]))
					this.setState({
						salary_data: parseInt(data[areaName][this.state.job]),
						status: 'underpaid'
					});

				} else if (current > parseInt(data[areaName][this.state.job])) {
					console.log('higher than: ', parseInt(data[areaName][this.state.job]));
					let diff = current-parseInt(data[areaName][this.state.job]);
					this.setState({
						salary_data: parseInt(data[areaName][this.state.job]),
						salary_difference: diff,
						status: 'paid'
					});
				}
			// Need to figure out something better here...
			} else { console.log ("seems like undefined")}
		});
	}


	render() {

		let status = 
			<Col xs={12}>
				<Col xs={6} md={12} id="initialArrow" className="initialBlock"></Col>
				<Col xs={6} md={12} id="initialText" className="initialBlock">
					<p>Fill out the the questions to see your results</p>
				</Col>
			</Col>


		if (this.state.status === 'updated') {

			status = 
				<Col xs={12} className="updatedBlock">
					<Col xs={12}>
						<h1 className="certHead">YOUR EMPLOYER'S RESULTS</h1>
					</Col>
					<Col xs={12} className="updatedContent">
						<p>{this.state.job} in the {this.state.area} area make an average
						of {this.state.salary_data} per year, according to the Bureau of Labor Statistics.</p>
					</Col>
					<Col xs={12} className="updatedContent">
						<p> Fill out all questions to see your full results.</p>
					</Col>
				</Col>


		} else if (this.state.status === 'underpaid') {

			status =
				<Col xs={12} className="readyBlock">
					<Col xs={12} id="readyHeader">
						<h1 className="certHead">NOTICE OF UNDERPAYMENT</h1>
					</Col>
					<Col xs={12} className="readyContentContainer">
						<Col xs={12} className="readyContent">
							<p>{this.state.job} in the {this.state.area} area make an average
							of ${this.state.salary_data} per year, according to the Bureau of Labor Statistics.</p>
						</Col>
						<Col xs={12} className="readyContent">
							<p> Will undervaluing your employee pay off?</p>
						</Col>
					</Col>
				</Col>
			$('.certificateBlock').css('background-color', '#FFD700');

		} else if (this.state.status === 'paid') {

			status =
				<Col xs={12} className="readyBlock">
					<Col xs={12} id="readyHeader">
						<h1 className="certHead">CONGRATULATIONS</h1>
					</Col>
					<Col xs={12} className="readyContentContainer">
						<Col xs={12} className="readyContent">
							<p>You're ${this.state.salary_difference} ahead of the game.  {this.state.job} in the {this.state.area} area make an average
							of ${this.state.salary_data} per year, according to the Bureau of Labor Statistics.</p>
						</Col>
						<Col xs={12} className="readyContent">
							<p>Treat yourself tonight, you've earned it.</p>
						</Col>
					</Col>
				</Col>

			$('.certificateBlock').css('background-color', '#FFD700');
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
	                    href="mailto:?subject=Join%20my%20mesh%20network!&body=I%20just%20registered%20as%20a%20node%20on%20the%20goTenna%20Mesh%20network%20map.%20Find%20it%20at%20imeshyou.com%20%26%20join%20the%20network%20by%20getting%20your%20own%20goTenna%20Mesh%20devices%20at%20is.gd%2Fgotennamesh.%0A%0AgoTenna%20Mesh%20is%20the%20first%20100%25%20off-grid%2C%20totally%20mobile%2C%20long-range%2C%20consumer-ready%20mesh%20network.%20You%20pair%20a%20goTenna%20Mesh%20device%20to%20your%20existing%20smartphone%20and%20it%20enables%20you%20to%20send%20texts%20%26%20locations%20on%20offline%20maps%20to%20other%20users%20up%20to%20several%20miles%2Fkilometers%20away%2C%20even%20if%20you%20don%E2%80%99t%20have%20service.%20%0A%0AgoTenna%20Mesh%20can%20automatically%20and%20privately%20relay%20your%20messages%20through%20other%20users%E2%80%99%20devices%20to%20reach%20recipients%20who%20are%20out%20of%20point-to-point%20range.%20This%20is%20a%20network%20that%20gets%20stronger%20the%20more%20people%20join%20it!%0A%0AThis%20is%20the%20future%20of%20people-powered%20connectivity%2C%20and%20it%E2%80%99s%20great%20for%20all%20outdoor%20adventures%2C%20crowded%20events%2C%20travel%20abroad%2C%20and%20unplanned%20emergencies.%20%0A%0AJoin%20me%20in%20creating%20this%20mesh%20network%3A%20is.gd%2Fgotennamesh" 
	                    target="_blank" title="Send email">
	                    <i className={"fa fa-envelope fa-3x"} aria-hidden="true"></i>
                    </a>
				</Col>
			</div>
			)
	}
}


export default Output;