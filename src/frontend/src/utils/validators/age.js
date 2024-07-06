const isAgeValid = (age) => {
	return age && !isNaN(age) && age > 5 && age < 120;
};

export default isAgeValid;
