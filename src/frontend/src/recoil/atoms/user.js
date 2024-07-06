import { atom } from "recoil";
import ax from "../../utils/ax";
import apiBaseURL from "../../utils/apiBaseURL";
import extractError from "../../utils/extractError";

const state = atom({
	key: "userState", // unique ID (with respect to other atoms/selectors)
	default: { firstCheckDone: false }
});

const refreshUsingAPI = (setUser) => {
	return ax
		.get(`${apiBaseURL}/user`)
		.then((res) => res.data)
		.then((data) => {
			setUser({ ...data, firstCheckDone: true });
		})
		.catch((error) => {
			console.log(
				"Error while refreshing user through API: ",
				extractError(error)
			);
			setUser({ firstCheckDone: true });
		});
};

const signin = (email, password, setUser) => {
	return ax
		.post(`${apiBaseURL}/auth/local`, { username: email, password })
		.then(() => refreshUsingAPI(setUser));
};

const signup = ({ name, email, password }, setUser) => {
	return ax
		.post(`${apiBaseURL}/auth/local/signup`, { email, password, name })
		.then(() => refreshUsingAPI(setUser));
};

const signout = (setUser) => {
	return ax
		.post(`${apiBaseURL}/user/logout`)
		.then(() => setUser({ firstCheckDone: true }));
};

const methods = {
	signin,
	signup,
	signout,
	refreshUsingAPI
};

export { state, methods };
