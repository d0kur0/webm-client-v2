import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import VideoArea from './components/VideoArea';
import Settings from './components/Settings';
import Disclaimer from './components/Disclaimer';

import Redirect from "react-router-dom/es/Redirect";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function PrivateRoute ({ children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				localStorage.disclaimerChecked ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/disclaimer",
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: ['dark', 'light'][prefersDarkMode],
				},
			}),
		[],
	);

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route path="/disclaimer">
						<Disclaimer />
					</Route>
					<PrivateRoute path="/settings">
						<Settings />
					</PrivateRoute>
					<PrivateRoute path="/">
						<VideoArea />
					</PrivateRoute>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

ReactDOM.render(App(), document.getElementById('root'));