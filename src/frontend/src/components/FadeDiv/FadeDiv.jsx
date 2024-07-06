import React from "react";
import { motion } from "framer-motion";

function FadeDiv({ children, ...props }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.1 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}

export default FadeDiv;
