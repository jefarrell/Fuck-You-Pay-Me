import React from 'react';
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

class Output extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			job: '',
			state: '',
			area: '',
			year: '',
			month: '',
			salary_start:'',
			salary_current:'',
			status: 'initial'
		};
	}

	componentWillUpdate(nextProps) {
		if (this.state.status !== nextProps.status) {
		this.setState({status: nextProps.status})
	}

	}

	render() {
		var status = 'initial';

		if (this.state.status === 'updated') {
			status = 'updated!'
		} else if (this.state.status === 'ready') {
			status = 'ready to roll'
		}
		console.log("status ", status)
		return(
			<Row className="certificateBlock">
				<Col xs={6} id="initialArrow" className="initial"></Col>
				<Col xs={6} id="initialText" className="initial">
					<p>Fill out the the questions above to see your results</p>
				</Col>
			</Row>
			)
	}
}


export default Output;