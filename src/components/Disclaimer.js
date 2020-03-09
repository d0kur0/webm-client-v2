import React from 'react';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

function VideoArea() {
	return (
		<>
			<CssBaseline />

			<Typography style={{ marginTop: 50 }}>
				Text should be white, background should be dark
			</Typography>

			<AppBar>
				<Typography variant="h6">App bar background should be dark!</Typography>
			</AppBar>

			<Button variant="contained" color="primary" disableElevation>
				Disclaimer
			</Button>

		</>
	);
}

export default VideoArea;
