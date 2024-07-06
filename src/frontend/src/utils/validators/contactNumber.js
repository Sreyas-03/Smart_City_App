const isContactNumberValid = (contactNumber) => {
	// check if contact number with country code is valid
	return /^\+[1-9]\d{1,14}$/.test(contactNumber);
};

export default isContactNumberValid;
