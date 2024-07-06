const isOTPValid = (otp) => {
	return otp && otp.length === 6;
};

export default isOTPValid;
