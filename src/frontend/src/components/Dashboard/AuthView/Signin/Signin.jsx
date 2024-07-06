import React, { useState } from "react";
import FadeDiv from "../../../FadeDiv/FadeDiv.jsx";
import TextLink from "../../../utils/TextLink/TextLink.jsx";
import { Alert, TextField } from "@mui/material";
import XTypography from "../../../XTypography/XTypography.jsx";
import NormalCaseButton from "../../../utils/NormalCaseButton/NormalCaseButton.jsx";
import isPasswordValid from "../../../../utils/validators/password.js";
import { Link } from "react-router-dom";
import extractError from "../../../../utils/extractError.js";
import * as userStore from "../../../../recoil/atoms/user.js";
import { useSetRecoilState } from "recoil";
import validationMessages from "../../../../utils/validators/validationMessages.js";

function Signin() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	const setUser = useSetRecoilState(userStore.state);

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const signIn = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		userStore.methods
			.signin(username, password, setUser)
			.catch((error) => setError(extractError(error)))
			.then(() => {
				setLoading(false);
			});
	};

	return (
		<FadeDiv className="flex min-h-full w-full flex-col justify-center py-12 sm:px-6 lg:px-8">
			{/* Headings */}
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<XTypography variant="h2" component="h1" className="text-center">
					Sign in to your account
				</XTypography>
				<XTypography variant="subtitle2" className="mt-2 text-center">
					Don't have an account yet?{" "}
					<Link to="../sign-up">
						<TextLink withoutLink>Sign up.</TextLink>
					</Link>
				</XTypography>

				{error && (
					<Alert severity="error" className="mt-8">
						Error: {error}
					</Alert>
				)}
			</div>

			{/* Login Actions */}
			<div className="mx-auto mt-8 max-w-xs sm:w-full sm:max-w-md">
				<div className="rounded-md bg-white px-4 py-8 sm:px-10">
					{/* Local Login */}
					<form className="space-y-4" onSubmit={signIn}>
						<TextField
							label="Username"
							autoComplete="username"
							onChange={handleUsernameChange}
							className="w-full"
						/>

						<TextField
							label="Password"
							type="password"
							autoComplete="password"
							error={password != null && !isPasswordValid(password)}
							helperText={
								password != null && !isPasswordValid(password)
									? validationMessages.password
									: ""
							}
							onChange={handlePasswordChange}
							className="w-full"
						/>

						<NormalCaseButton
							variant="contained"
							size="large"
							type="submit"
							disabled={!(username && isPasswordValid(password) && !loading)}
							className="w-full"
						>
							Login with Email
						</NormalCaseButton>
					</form>
				</div>
			</div>
		</FadeDiv>
	);
}

export default Signin;
