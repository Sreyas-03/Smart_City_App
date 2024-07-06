import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Signin from "./Signin/Signin.jsx";
import Signup from "./Signup/Signup.jsx";
import { AnimatePresence } from "framer-motion";
import FadeDiv from "../../FadeDiv/FadeDiv.jsx";
import { useRecoilValue } from "recoil";
import * as userStore from "../../../recoil/atoms/user.js";

function AuthView() {
	const user = useRecoilValue(userStore.state);
	const navigate = useNavigate();

	const routes = useRoutes([
		{ path: "sign-in", element: <Signin /> },
		{ path: "sign-up", element: <Signup /> }
	]);

	useEffect(() => {
		if (user.email) {
			navigate("/");
		}
	}, [user.email]);

	return (
		user.firstCheckDone && (
			<FadeDiv className="h-screen">
				<AnimatePresence mode="wait">
					{routes && React.cloneElement(routes, { key: location.pathname })}
				</AnimatePresence>
			</FadeDiv>
		)
	);
}

export default AuthView;
