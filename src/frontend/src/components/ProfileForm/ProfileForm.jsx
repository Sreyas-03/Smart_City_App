import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import validationMessages from "../../utils/validators/validationMessages";
import isEmailValid from "../../utils/validators/email";
import isPasswordValid from "../../utils/validators/password";
import NormalCaseButton from "../utils/NormalCaseButton/NormalCaseButton";
import { useRecoilValue } from "recoil";
import * as userStore from "../../recoil/atoms/user";

function ProfileForm({ isUpdate, onSubmit, loading }) {
	const user = useRecoilValue(userStore.state);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		// prefill details if available (will help with update)
		if (user.username) {
			setName(user.name);
			setEmail(user.email);
		}
	}, [user]);

	return (
		<form
			className="space-y-4"
			onSubmit={(e) =>
				onSubmit(e, {
					name,
					email,
					password
				})
			}
		>
			<TextField
				label="Name"
				autoComplete="given-name"
				onChange={(event) => setName(event.target.value)}
				value={name}
				className="w-full"
			/>

			<TextField
				label="Email Address"
				type="email"
				autoComplete="email"
				error={email !== "" && !isEmailValid(email)}
				helperText={
					email !== "" && !isEmailValid(email) ? validationMessages.email : ""
				}
				onChange={(event) => setEmail(event.target.value)}
				value={email}
				className="w-full"
			/>

			<TextField
				label="Password"
				type="password"
				autoComplete="new-password"
				error={password !== "" && !isPasswordValid(password)}
				helperText={
					password !== "" && !isPasswordValid(password)
						? validationMessages.password
						: ""
				}
				onChange={(event) => setPassword(event.target.value)}
				className="w-full"
			/>

			<NormalCaseButton
				variant="contained"
				size="large"
				type="submit"
				disabled={
					!(
						name &&
						isEmailValid(email) &&
						isPasswordValid(password) &&
						!loading
					)
				}
				className="w-full"
			>
				{isUpdate ? "Save" : "Sign Up"}
			</NormalCaseButton>
		</form>
	);
}

export default ProfileForm;
