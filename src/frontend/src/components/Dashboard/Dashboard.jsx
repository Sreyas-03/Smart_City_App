import React, { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LoginIcon from "@mui/icons-material/Login";
import MapIcon from "@mui/icons-material/Map";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import MyWidgets from "./MyWidgets/MyWidgets.jsx";
import MapView from "./MapView/MapView.jsx";
import MoreView from "./MoreView/MoreView.jsx";
import { AnimatePresence } from "framer-motion";
import { useRecoilValue } from "recoil";
import * as userStore from "../../recoil/atoms/user.js";
import AuthView from "./AuthView/AuthView.jsx";
import Summary from "./Summary/Summary.jsx";
import BlockedSensorTypes from "./BlockedSensorTypes/BlockedSensorTypes.jsx";
import CreateReport from "./CreateReport/CreateReport.jsx";
import ViewReports from "./ViewReports/ViewReports.jsx";

function Dashboard() {
	const [tab, setTab] = useState(-1);
	const user = useRecoilValue(userStore.state);
	const navigate = useNavigate();
	const location = useLocation();

	const routes = useRoutes([
		{ path: "my-widgets", element: <MyWidgets /> },
		{ path: "blocked-sensor-types", element: <BlockedSensorTypes /> },
		{ path: "create-report", element: <CreateReport /> },
		{ path: "view-reports", element: <ViewReports /> },
		{ path: "summary", element: <Summary /> },
		{ path: "map", element: <MapView /> },
		{ path: "auth/*", element: <AuthView /> },
		{ path: "more", element: <MoreView /> }
	]);

	const loggedIn = user.hasOwnProperty("email") && user.email;

	const tabRoutes = ["my-widgets", "summary", "map", "more", "auth/sign-in"];

	useEffect(() => {
		if (tab !== -1) navigate(`${tabRoutes[tab]}`);
	}, [tab]);

	// update the tab value based on the route
	useEffect(() => {
		if (user.firstCheckDone) {
			let currentRoute = location.pathname.split("/")[1];

			if (currentRoute === "auth") setTab(tabRoutes.indexOf("auth/sign-in"));
			else
				setTab(
					currentRoute ? tabRoutes.indexOf(currentRoute) : loggedIn ? 0 : 1
				);
		}
	}, [location.pathname, loggedIn, user.firstCheckDone]);

	return (
		<div className="min-h-full">
			<AnimatePresence mode="wait">
				{routes && React.cloneElement(routes, { key: location.pathname })}
			</AnimatePresence>

			<Paper
				sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
				className="z-20"
				elevation={3}
			>
				<BottomNavigation
					showLabels
					value={tab}
					onChange={(event, newValue) => {
						setTab(newValue);
					}}
				>
					<BottomNavigationAction
						label="My Widgets"
						icon={<WidgetsIcon />}
						className={`${!loggedIn && "hidden"}`}
					/>
					<BottomNavigationAction
						label="Summary"
						icon={<SummarizeIcon />}
						className={`${loggedIn && "hidden"}`}
					/>
					<BottomNavigationAction label="Map" icon={<MapIcon />} />
					<BottomNavigationAction
						label="More"
						icon={<MoreHorizIcon />}
						className={`${!loggedIn && "hidden"}`}
					/>
					<BottomNavigationAction
						label="Login"
						icon={<LoginIcon />}
						className={`${loggedIn && "hidden"}`}
					/>
				</BottomNavigation>
			</Paper>
		</div>
	);
}

export default Dashboard;
