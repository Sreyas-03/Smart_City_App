import React, { useEffect, useState } from "react";
import { IconButton, List, ListItem } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import FadeDiv from "../../FadeDiv/FadeDiv.jsx";
import ax from "../../../utils/ax.js";
import apiBaseURL from "../../../utils/apiBaseURL.js";
import extractError from "../../../utils/extractError.js";
import DoneIcon from "@mui/icons-material/Done";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function ViewReports() {
	const [reports, setReports] = useState([]);

	const fetchReports = () => {
		ax.get(`${apiBaseURL}/reports`)
			.then((res) => {
				setReports(res.data.reports);
			})
			.catch((err) => alert(extractError(err)));
	};

	useEffect(() => {
		fetchReports();
	}, []);

	const reportAction = (id, action) => {
		ax.post(`${apiBaseURL}/reports/action`, { id, action })
			.then((res) => {
				if (!res.data.success) alert(extractError(res.data));
				fetchReports();
			})
			.catch((err) => alert(extractError(err)));
	};

	return (
		<FadeDiv className="px-6 pt-12">
			<h1 className="text-3xl font-extralight tracking-tight text-opacity-80 sm:text-5xl">
				Pending Reports
			</h1>
			<List className="mt-4">
				{reports
					.filter((report) => !report.resolved)
					.map((report) => (
						<ListItem
							key={report._id}
							secondaryAction={
								<>
									<IconButton
										aria-label="resolve"
										color="success"
										onClick={() => reportAction(report._id, "resolve")}
									>
										<DoneIcon className="text-xl" />
									</IconButton>
									<IconButton
										aria-label="remove"
										color="error"
										onClick={() => reportAction(report._id, "delete")}
									>
										<ClearIcon className="text-xl" />
									</IconButton>
								</>
							}
						>
							{report.text}
						</ListItem>
					))}
			</List>
			<h1 className="mt-4 text-3xl font-extralight tracking-tight text-opacity-80 sm:text-5xl">
				Resolved Reports
			</h1>
			<List className="mt-4">
				{reports
					.filter((report) => report.resolved)
					.map((report) => (
						<ListItem
							key={report._id}
							secondaryAction={
								<>
									<IconButton
										aria-label="resolve"
										color="secondary"
										onClick={() => reportAction(report._id, "resolve")}
									>
										<AutorenewIcon className="text-xl" />
									</IconButton>
									<IconButton
										aria-label="remove"
										color="error"
										onClick={() => reportAction(report._id, "delete")}
									>
										<ClearIcon className="text-xl" />
									</IconButton>
								</>
							}
						>
							{report.text}
						</ListItem>
					))}
			</List>
		</FadeDiv>
	);
}

export default ViewReports;
