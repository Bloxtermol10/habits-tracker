export const increaseClassSpecificity = () => {
	console.log("increaseClassSpecificity");
	const headEl = document.querySelector("head");
	const styleTags = document.querySelectorAll("style[data-emotion]");
	const containerCalendar = document.querySelector(
		"div[data-testid='calendar--container']"
	);
	let number = 1;

	console.log(containerCalendar);

	styleTags.forEach((styleTag) => {
		styleTag.innerHTML = `body ${styleTag.innerHTML}`;

		styleTag.setAttribute("data-emotion", `css-${number}`);
		console.log(++number, styleTag.innerHTML);
	});

	console.log(headEl?.childElementCount);

	console.log(containerCalendar);
};
