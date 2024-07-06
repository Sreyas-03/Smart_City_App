import React, { useEffect, useState } from "react";
import FadeDiv from "../../FadeDiv/FadeDiv.jsx";
import * as userStore from "../../../recoil/atoms/user.js";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import ax from "../../../utils/ax.js";
import apiBaseURL from "../../../utils/apiBaseURL.js";
import AddIcon from "@mui/icons-material/Add";
import Widget from "../Widget/Widget.jsx";
import { Dialog, DialogContent, DialogTitle, Fab } from "@mui/material";
import CreateWidget from "../CreateWidget/CreateWidget.jsx";
import { AnimatePresence, motion } from "framer-motion";
import extractError from "../../../utils/extractError.js";

function MyWidgets() {
	const [user, setUser] = useRecoilState(userStore.state);
	const [showNewWidgetDialog, setShowNewWidgetDialog] = useState(false);
	const [widgets, setWidgets] = useState([]);
	const navigate = useNavigate();

	// redirect to / if user isn't logged in
	useEffect(() => {
		if (user.firstCheckDone && !user.email) {
			console.log("User isn't logged in, rejecting from my-widgets");
			navigate("/");
		}
	}, [user.firstCheckDone, user.email]);

	const fetchWidgets = () => {
		if (user.firstCheckDone && user.email)
			ax.get(`${apiBaseURL}/widgets/my`)
				.then((res) => setWidgets(res.data))
				.catch((err) => alert(extractError(err)));
	};

	// fetch widgets
	useEffect(fetchWidgets, [user.firstCheckDone, user.email]);

	return (
		user.email && (
			<FadeDiv className="px-6 pt-12">
				<h1 className="text-3xl font-extralight tracking-tight text-opacity-80 sm:text-5xl">
					Hello, <span className="font-normal">{user.name}</span>!
				</h1>

				<div className="mt-6">
					<AnimatePresence mode="sync">
						{widgets.map((widget) => (
							<motion.div layout key={widget._id}>
								<Widget {...widget} fetchWidgets={fetchWidgets} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>

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
			</FadeDiv>
		)
	);
}

export default MyWidgets;
