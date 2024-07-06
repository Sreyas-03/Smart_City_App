import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import FadeDiv from "../../FadeDiv/FadeDiv.jsx";
import ax from "../../../utils/ax.js";
import apiBaseURL from "../../../utils/apiBaseURL.js";
import extractError from "../../../utils/extractError.js";

function CreateReport() {
	const [report, setReport] = useState("");

	const submitReport = () => {
		ax.post(`${apiBaseURL}/reports`, { text: report })
			.then((res) => {
				if (!res.data.success) return alert(extractError(res.data));
				alert("Report submitted successfully!");
				setReport("");
			})
			.catch((err) => alert(extractError(err)));
	};

	return (
		<FadeDiv className="px-6 pt-12">
			<h1 className="text-3xl font-extralight tracking-tight text-opacity-80 sm:text-5xl">
				Report Issues
			</h1>
			<div className="align-center mt-4 flex flex-col justify-center">
				<TextField
					label="Sensor Type"
					size="small"
					value={report}
					onChange={(e) => setReport(e.target.value)}
				/>
				<Button variant="outlined" className="mt-2" onClick={submitReport}>
					Report
				</Button>
			</div>
		</FadeDiv>
	);
}

export default CreateReport;
