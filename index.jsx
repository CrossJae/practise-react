import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory,IndexRoute ,browserHistory} from 'react-router';
import App from './app/App.jsx';

ReactDOM.render(
	<App />,
	document.querySelector("#App")
);
