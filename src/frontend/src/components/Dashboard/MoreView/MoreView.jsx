import React, { useEffect } from "react";
import FadeDiv from "../../FadeDiv/FadeDiv.jsx";
import { useRecoilState } from "recoil";
import { List, ListItem } from "@mui/material";
import * as userStore from "../../../recoil/atoms/user.js";
import { Link, useNavigate } from "react-router-dom";
import NormalCaseButton from "../../utils/NormalCaseButton/NormalCaseButton.jsx";

function MoreView() {
	const [user, setUser] = useRecoilState(userStore.state);
	const navigate = useNavigate();

	// redirect to / if user isn't logged in
	useEffect(() => {
		if (!user.email) navigate("/");
	}, [user.email]);

	return (
		<FadeDiv className="flex h-screen w-full flex-col items-center justify-center">
			<List className="w-full max-w-xs">
				<ListItem>
					<Link to="/summary" className="w-full">
						<NormalCaseButton className="w-full text-left">
							Default Summary
						</NormalCaseButton>
					</Link>
				</ListItem>
				<ListItem>
					<Link to="/create-report" className="w-full">
						<NormalCaseButton className="w-full">
							Report an Issue
						</NormalCaseButton>
					</Link>
				</ListItem>
				{user.admin && (
					<>
						<ListItem>
							<Link to="/view-reports" className="w-full">
								<NormalCaseButton className="w-full">
									View Reports
								</NormalCaseButton>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/blocked-sensor-types" className="w-full">
								<NormalCaseButton className="w-full">
									Blocked Sensor Types
								</NormalCaseButton>
							</Link>
						</ListItem>
					</>
				)}
				<ListItem>
					<NormalCaseButton
						color="error"
						className="w-full"
						onClick={() => userStore.methods.signout(setUser)}
					>
						Logout
					</NormalCaseButton>
				</ListItem>
			</List>
		</FadeDiv>
	);
}

export default MoreView;
