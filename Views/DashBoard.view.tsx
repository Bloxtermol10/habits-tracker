import { ItemView, WorkspaceLeaf } from "obsidian";
import { createRoot } from "react-dom/client";
import DashBoard from "./DashBoard";
import '@atlaskit/css-reset';
export const VIEW_TYPE_DASH_BOARD = "dash-board";

const increaseClassSpecificity = () => {

	console.log("increaseClassSpecificity");
	const headEl = document.querySelector("head");
	const styleTags = document.querySelectorAll("style[data-emotion]");
	const containerCalendar = document.querySelector(
		".calendar--container"
	);
	let number = 1;

	styleTags.forEach((styleTag) => {
		styleTag.innerHTML = `body ${styleTag.innerHTML}`;
		console.log(++number, styleTag.innerHTML);

	});

	console.log(headEl?.childElementCount);

	console.log(containerCalendar);
};
export class DashBoardView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_DASH_BOARD;
	}

	getDisplayText() {
		return "Dash Board";
	}

	getIcon() {
		return "calendar";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		createRoot(container).render(
			<DashBoard />
		);

		increaseClassSpecificity();
	}

	async onClose() {
		// Nothing to clean up.
	}
}
