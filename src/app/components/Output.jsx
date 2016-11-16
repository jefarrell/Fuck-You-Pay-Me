import React from 'react';
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

class Output extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			job: '_____',
			state: '',
			area: '_____',
			salary_current:'',
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

		} else return
	}

	render() {

		let status = 
			<Col xs={12}>
				<Col xs={6} id="initialArrow" className="initialBlock"></Col>
				<Col xs={6} id="initialText" className="initialBlock">
					<p>Fill out the the questions above to see your results</p>
				</Col>
			</Col>

		if (this.state.status === 'updated') {

			status = 
				<Col xs={12} className="updatedBlock">
					<Col xs={12}>
						<h1>YOUR EMPLOYER'S RESULTS</h1>
					</Col>
					<Col xs={12} className="updatedContent">
						<p>{this.state.job} in the {this.state.area} area make an average
						of _____ per year, according to the Bureau of Labor Statistics.</p>
					</Col>
					<Col xs={12} className="updatedContent">
						<p> Fill out all questions to see your full results.</p>
					</Col>
				</Col>

		} else if (this.state.status === 'ready') {

			//$('.certificateBlock').css('background-color','#FFD700')

			status =
				<Col xs={12} className="readyBlock">
					<Col xs={12} id="readyHeader">
						<h1>NOTICE OF UNDERPAYMENT</h1>
					</Col>
					<Row id="test">
						<Col xs={12} className="readyContent">
							<p>{this.state.job} in the {this.state.area} area make an average
							of _____ per year, according to the Bureau of Labor Statistics.</p>
						</Col>
						<Col xs={12} className="readyContent">
							<p> Will undervaluing your employee pay off?</p>
						</Col>
					</Row>
				</Col>
		}

		return(
			<Row className="certificateBlock">
				{status}
			</Row>
			)
	}
}


export default Output;