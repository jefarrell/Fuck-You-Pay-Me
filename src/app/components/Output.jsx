import React from 'react';

class Output extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			status: 'initial'
		};
	}


	render() {



		return(
			<div className="certificateBlock initial">
				Fill out the the questions above to see your results
			</div>
			)
	}
}


export default Output;