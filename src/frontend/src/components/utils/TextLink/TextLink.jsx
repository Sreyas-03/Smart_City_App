import React from "react";

function TextLink(props) {
	const containerClasses =
		"text-indigo-600 hover:underline transition-all duration-200 cursor-pointer" +
		(props.classNames || "");

	return props.withoutLink ? (
		<span className={containerClasses} onClick={props.onClick}>
			{props.children}
		</span>
	) : (
		<a className={containerClasses} href={props.href}>
			{props.children}
		</a>
	);
}

export default TextLink;
