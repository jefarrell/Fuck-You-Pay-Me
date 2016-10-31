import React from 'react';
import {render} from 'react-dom';
import Inputs from './Inputs.jsx';

require('../styles/main.scss');

class App extends React.Component {
	render() {
		return (
			<div>
				<Inputs />
			</div>
		);
	}
};


render(<App/>, document.getElementById('root'));
