const extractError = (res) => {
	if (!res) return "Unidentified";

	if (res.response) res = res.response.data;

	return res.message || res.error || JSON.stringify(res);
};

export default extractError;
