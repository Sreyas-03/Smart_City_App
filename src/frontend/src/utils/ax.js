import axios from "axios";

const ax = axios.create({
	withCredentials: true
});

export default ax;
