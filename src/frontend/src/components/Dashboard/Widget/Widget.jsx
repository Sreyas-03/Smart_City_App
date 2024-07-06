import React, { useEffect, useState } from "react";
import FadeDiv from "../../FadeDiv/FadeDiv.jsx";
import locationCodeToName from "../../../utils/locationCodeToName.js";
import apiBaseURL from "../../../utils/apiBaseURL.js";
import extractError from "../../../utils/extractError.js";
import ax from "../../../utils/ax.js";
import { CircularProgress, IconButton } from "@mui/material";
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	LinearScale,
	LineElement,
	PointElement,
	TimeSeriesScale,
	Title,
	Tooltip
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import ClearIcon from "@mui/icons-material/Clear";
import { useRecoilValue } from "recoil";
import * as userStore from "../../../recoil/atoms/user.js";

const units = {
	Temperature: "°C",
	PM10: "µg/m³",
	"PM2.5": "µg/m³",
	"Compensated TDS Value": "ppm",
	"Uncompensated TDS Value": "ppm",
	CO2: "ppm",
	"Relative Humidity": "%",
	"Flow Rate": "L/min",
	"Total Flow": "L",
	Pressure: "kPa",
	"Pressure Voltage": "V",
	AQI: "",
	AQL: "",
	"AQI-MP": ""
};

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	TimeSeriesScale
);

ChartJS.defaults.color = "rgba(255, 255, 255, 0.7)";
ChartJS.defaults.borderColor = "#0A6ACB";
ChartJS.defaults.backgroundColor = "#0A6ACB";
ChartJS.defaults.font.family = "Public Sans";
ChartJS.defaults.font.weight = 500;

const options = {
	scales: {
		x: {
			grid: {
				display: false
			}
		},
		y: {
			grid: {
				display: false
			}
			// position: "right"
		}
	},
	maintainAspectRatio: false
};

function Widget({
	_id,
	type,
	location,
	visualisation,
	threshold,
	fetchWidgets,
	defaultWidgets = false
}) {
	const user = useRecoilValue(userStore.state);
	const [data, setData] = useState({
		lastMean: 0,
		history: []
	});
	const [timestamps, setTimestamps] = useState([]);
	const [values, setValues] = useState([]);

	useEffect(() => {
		ax.get(`${apiBaseURL}/widgets/data`, { params: { type, location } })
			.then((res) => setData(res.data))
			.catch((err) => alert(extractError(err)));
	}, []);

	useEffect(() => {
		const dataMap = {};

		data.history.forEach((item) => {
			let time = Object.keys(item)[0],
				value = Object.values(item)[0];

			if (dataMap[time]) dataMap[time].push(value);
			else dataMap[time] = [value];
		});

		let timestamps = Object.keys(dataMap).sort((a, b) => {
				const dateA = new Date(a),
					dateB = new Date(b);

				return dateA - dateB;
			}),
			values = [];

		timestamps = timestamps.slice(timestamps.length - 80, timestamps.length);

		timestamps.forEach((time) =>
			values.push(dataMap[time].reduce((a, b) => a + b) / dataMap[time].length)
		);

		setTimestamps(
			timestamps.map((time) => {
				const date = new Date(time);

				return `${date.getDate()}/${
					date.getMonth() + 1
				} ${date.getHours()}:${date.getMinutes()}`;
				// return date;
			})
		);
		setValues(values);
	}, [data.history]);

	const deleteWidget = () => {
		ax.post(`${apiBaseURL}/widgets/delete`, { _id })
			.then(({ data }) => {
				if (data.success) {
					fetchWidgets();
					// return alert("Widget deleted successfully!");
					return;
				}

				alert(`Couldn't delete widget: ${extractError(data)}`);
			})
			.catch((err) => alert(extractError(err)));
	};

	let backgroundClass = "bg-p-blue-dark";
	if (data.lastMean) {
		if (data.lastMean <= threshold.l1) backgroundClass = "bg-p-blue-light";
		else if (data.lastMean > threshold.l2) backgroundClass = "bg-p-orange";
	}

	return (
		<FadeDiv
			className={`my-4 rounded-md p-4 text-white shadow-lg ${backgroundClass}`}
		>
			<div className="flex items-center justify-between">
				<div>
					<div className="text-sm font-medium text-white text-opacity-80">
						{locationCodeToName[location]} ({type})
					</div>
					{data.history.length ? (
						<div className="mt-0.5 text-2xl font-bold">
							{Math.floor(data.lastMean * 1000) / 1000}{" "}
							<span className="text-base font-normal text-white text-opacity-70">
								{units[type] ? units[type] : ""}
							</span>
						</div>
					) : (
						<CircularProgress className="mt-4 text-white" size="1rem" />
					)}
				</div>
				{(!defaultWidgets || user.admin) && (
					<IconButton size="small" onClick={deleteWidget}>
						<ClearIcon className="text-base text-white" />
					</IconButton>
				)}
			</div>

			{visualisation !== "static" && (
				<div className="mt-4 w-full">
					{visualisation === "bar" && (
						<Bar
							options={options}
							data={{
								labels: timestamps,
								datasets: [{ label: "Values", data: values }]
							}}
						/>
					)}

					{visualisation === "line" && (
						<Line
							options={options}
							data={{
								labels: timestamps,
								datasets: [{ label: "Values", data: values }]
							}}
						/>
					)}
				</div>
			)}
		</FadeDiv>
	);
}

export default Widget;
