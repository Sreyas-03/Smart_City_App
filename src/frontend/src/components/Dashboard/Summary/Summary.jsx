import React, { useEffect, useState } from "react";
import FadeDiv from "../../FadeDiv/FadeDiv.jsx";
import ax from "../../../utils/ax.js";
import apiBaseURL from "../../../utils/apiBaseURL.js";
import Widget from "../Widget/Widget.jsx";
import { AnimatePresence, motion } from "framer-motion";
import extractError from "../../../utils/extractError.js";
import { useRecoilValue } from "recoil";
import * as userStore from "../../../recoil/atoms/user.js";
import { Dialog, DialogContent, DialogTitle, Fab } from "@mui/material";
import CreateWidget from "../CreateWidget/CreateWidget.jsx";
import AddIcon from "@mui/icons-material/Add.js";

function Summary() {
	const user = useRecoilValue(userStore.state);
	const [widgets, setWidgets] = useState([]);
	const [showNewWidgetDialog, setShowNewWidgetDialog] = useState(false);

	const fetchWidgets = () =>
		ax
			.get(`${apiBaseURL}/widgets`)
			.then((res) => setWidgets(res.data))
			.catch((err) => alert(extractError(err)));

	useEffect(() => {
		fetchWidgets();
	}, []);

	return (
		<FadeDiv className="px-6 pt-12">
			<h1 className="text-3xl font-extralight tracking-tight text-opacity-80 sm:text-5xl">
				Summary
			</h1>

			<div className="mt-6">
				<AnimatePresence mode="sync">
					{widgets.map((widget) => (
						<motion.div layout key={widget._id}>
							<Widget
								{...widget}
								fetchWidgets={fetchWidgets}
								defaultWidgets={true}
							/>
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			{user.admin && (
				<>
					<Dialog
						onClose={() => setShowNewWidgetDialog(false)}
						open={showNewWidgetDialog}
						maxWidth="sm"
						fullWidth={true}
					>
						<DialogTitle>New Widget</DialogTitle>
						<DialogContent className="pt-4">
							<CreateWidget
								onClose={() => {
									fetchWidgets();
									setShowNewWidgetDialog(false);
								}}
								isDefault={true}
							/>
						</DialogContent>
					</Dialog>

					<Fab
						color="primary"
						size="medium"
						aria-label="add"
						className="fixed bottom-20 right-6"
						onClick={() => setShowNewWidgetDialog(true)}
					>
						<AddIcon />
					</Fab>
				</>
			)}
		</FadeDiv>
	);
}

export default Summary;
