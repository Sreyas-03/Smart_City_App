import React, { useEffect, useState } from "react";
import apiBaseURL from "../../../utils/apiBaseURL.js";
import extractError from "../../../utils/extractError.js";
import ax from "../../../utils/ax.js";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, IconButton, List, ListItem, TextField } from "@mui/material";
import FadeDiv from "../../FadeDiv/FadeDiv.jsx";

function BlockedSensorTypes() {
	const [blockedSensorTypes, setBlockedSensorTypes] = useState([]);
	const [toggleSensorTypeValue, setToggleSensorTypeValue] = useState();

	const fetchBlockedSensorTypes = () => {
		ax.get(`${apiBaseURL}/nodes/blockedSensorTypes`)
			.then((res) => {
				setBlockedSensorTypes(res.data.blockedSensorTypes);
			})
			.catch((err) => alert(extractError(err)));
	};

	const toggleStatus = (type) => {
		ax.post(`${apiBaseURL}/nodes/toggleBlockedSensorType`, { type })
			.then((res) => {
				if (!res.data.success) alert(extractError(res.data));
				fetchBlockedSensorTypes();
			})
			.catch((err) => alert(extractError(err)));
	};

	useEffect(() => {
		fetchBlockedSensorTypes();
	}, []);

	return (
		<FadeDiv className="px-6 pt-12">
			<h1 className="text-3xl font-extralight tracking-tight text-opacity-80 sm:text-5xl">
				Blocked Sensor Types
			</h1>
			<List className="mt-4">
				{blockedSensorTypes.map((sensorType) => (
					<ListItem
						key={sensorType._id}
						secondaryAction={
							<IconButton
								aria-label="remove"
								color="error"
								onClick={() => toggleStatus(sensorType.type)}
							>
								<ClearIcon className="text-xl" />
							</IconButton>
						}
					>
						{sensorType.type}
					</ListItem>
				))}
			</List>
			<div className="align-center flex flex-col justify-center mt-4">
				<TextField
					label="Sensor Type"
					size="small"
					onChange={(e) => setToggleSensorTypeValue(e.target.value)}
				/>
				<Button
					variant="outlined"
					className="mt-2"
					onClick={() => toggleStatus(toggleSensorTypeValue)}
				>
					Toggle Block Status
				</Button>
			</div>
		</FadeDiv>
	);
}

export default BlockedSensorTypes;
