import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import * as userStore from "./recoil/atoms/user";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
	typography: {
		fontFamily:
			"'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
	},

	palette: {
		mode: "light",
		primary: {
			main: "#4F46E5"
		}
	}
});

function App() {
	const setUser = useSetRecoilState(userStore.state);

	useEffect(() => {
		userStore.methods.refreshUsingAPI(setUser);
	}, [setUser]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Dashboard />
		</ThemeProvider>
	);
}

export default App;
