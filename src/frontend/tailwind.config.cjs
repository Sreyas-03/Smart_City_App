/** @type {import("tailwindcss").Config} */

module.exports = {
	important: true,
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"p-blue-dark": "#00095a",
				"p-blue": "#0A6ACB",
				"p-blue-light": "#00B4D8",
				"p-orange-dark": "#F26419",
				"p-orange": "#F6A02D"
			},
			fontFamily: {
				// inter: ['Public Sans', 'sans-serif'],
			}
		}
	},
	plugins: [require("@tailwindcss/typography")]
};
