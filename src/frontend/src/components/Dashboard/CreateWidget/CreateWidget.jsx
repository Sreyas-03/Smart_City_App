import React, { useEffect } from "react";
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select
} from "@mui/material";
import ax from "../../../utils/ax.js";
import extractError from "../../../utils/extractError.js";
import apiBaseURL from "../../../utils/apiBaseURL.js";
import locationCodeToName from "../../../utils/locationCodeToName.js";

function CreateWidget({ onClose, isDefault = false }) {
	const [locationOptions, setLocationOptions] = React.useState([]);

	const [chosenLocation, setChosenLocation] = React.useState("");
	const [chosenSensorType, setChosenSensorType] = React.useState("");
	const [chosenVisualisation, setChosenVisualisation] = React.useState("line");

	// Fetch node data from API
	useEffect(() => {
		ax.get(`${apiBaseURL}/nodes`)
			.then((res) => {
				const nodes = res.data.nodes;
				const locationOptions = {};

				nodes.forEach((node) => {
					const location = node.name.split("-").at(-2);

					if (!locationOptions.hasOwnProperty(location))
						locationOptions[location] = new Set();

					node.data.forEach(({ name }) => locationOptions[location].add(name));
				});

				setLocationOptions(locationOptions);
			})
			.catch((err) => alert(extractError(err)));
	}, []);

	const onCreate = () => {
		ax.post(`${apiBaseURL}/widgets/my`, {
			type: chosenSensorType,
			location: chosenLocation,
			visualisation: chosenVisualisation,
			isDefault
		})
			.then(() => {
				// alert("Widget created successfully!");
				onClose();
			})
			.catch((err) => alert(extractError(err)));
	};

	return (
		<>
			<FormControl fullWidth>
				<InputLabel>Location</InputLabel>
				<Select
					value={chosenLocation}
					label="Location"
					onChange={(e) => {
						setChosenSensorType("");
						setChosenLocation(e.target.value);
					}}
				>
					{Object.keys(locationOptions).map((location) => (
						<MenuItem value={location} key={location}>
							{locationCodeToName[location]}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{chosenLocation !== "" && (
				<FormControl fullWidth className="mt-4">
					<InputLabel>Sensor Type</InputLabel>
					<Select
						value={chosenSensorType}
						label="Sensor Type"
						onChange={(e) => setChosenSensorType(e.target.value)}
					>
						{[...locationOptions[chosenLocation]].map((sensorType) => (
							<MenuItem value={sensorType} key={sensorType}>
								{sensorType}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}

			{chosenSensorType !== "" && (
				<FormControl fullWidth className="mt-4">
					<InputLabel>Visualisation</InputLabel>
					<Select
						value={chosenVisualisation}
						label="Visualisation"
						onChange={(e) => setChosenVisualisation(e.target.value)}
					>
						<MenuItem value="line">Line Chart</MenuItem>
						<MenuItem value="bar">Bar Graph</MenuItem>
						<MenuItem value="static">Static</MenuItem>
					</Select>
				</FormControl>
			)}

			{chosenSensorType !== "" && (
				<Button className="mt-4" size="small" onClick={onCreate}>
					Create Widget
				</Button>
			)}
		</>
	);
}

export default CreateWidget;
