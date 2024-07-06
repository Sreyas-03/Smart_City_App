import React, { useState } from "react";
import TextLink from "../../../utils/TextLink/TextLink.jsx";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import extractError from "../../../../utils/extractError.js";
import { useSetRecoilState } from "recoil";
import * as userStore from "../../../../recoil/atoms/user.js";
import FadeDiv from "../../../FadeDiv/FadeDiv.jsx";
import XTypography from "../../../XTypography/XTypography.jsx";
import ProfileForm from "../../../ProfileForm/ProfileForm.jsx";

function Signup() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const setUser = useSetRecoilState(userStore.state);

	const signUp = (e, user) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		userStore.methods
			.signup(user, setUser)
			.then(() => {
				alert("Created account!");
			})
			.catch((error) => {
				setError(extractError(error));
				console.error(error);
			})
			.then(() => setLoading(false));
	};

	// if (user.email) return <Navigate to="/" />;

	return (
		<FadeDiv className="flex min-h-full w-full flex-col justify-center py-12 sm:px-6 lg:px-8">
			{/* Headings */}
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<XTypography variant="h2" component="h1" className="text-center">
					Sign up for an account
				</XTypography>
				<XTypography variant="subtitle2" className="mt-2 text-center">
					Have one already?{" "}
					<Link to="../sign-in">
						<TextLink withoutLink>Sign in.</TextLink>
					</Link>
				</XTypography>

				{error && (
					<Alert severity="error" className="mt-8">
						Error: {error}
					</Alert>
				)}
			</div>

			{/* Signup Actions */}
			<div className="mx-auto mt-8 max-w-xs sm:w-full sm:max-w-md">
				<div className="rounded-md bg-white px-4 py-8 sm:px-10">
					{/* Local Signup */}
					<ProfileForm onSubmit={signUp} loading={loading} isUpdate={false} />
				</div>
			</div>
		</FadeDiv>
	);
}

export default Signup;
