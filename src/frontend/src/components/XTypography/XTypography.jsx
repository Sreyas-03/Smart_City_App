import React from "react";
import { Typography } from "@mui/material";

const classes = {
	h1: "text-4xl font-bold tracking-tight text-gray-900",
	h2: "text-3xl font-bold tracking-tight text-gray-900",
	subtitle1: "text-gray-600 font-normal",
	subtitle2: "text-sm text-gray-600 font-normal"
};

const getClasses = (variant) => {
	return classes[variant] || "";
};

function XTypography({ className, children, ...props }) {
	return (
		<Typography
			{...props}
			className={`${getClasses(props.variant)} ${className}`}
		>
			{children}
		</Typography>
	);
}

export default XTypography;
