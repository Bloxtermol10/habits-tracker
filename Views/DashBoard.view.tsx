import { ItemView, WorkspaceLeaf } from "obsidian";
import { createRoot } from "react-dom/client";
import DashBoard from "./DashBoard";
import '@atlaskit/css-reset';
export const VIEW_TYPE_DASH_BOARD = "dash-board";


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
			<div className="dark">


				<DashBoard />
			</div>
		);


	}

	async onClose() {
		// Nothing to clean up.
	}
}
