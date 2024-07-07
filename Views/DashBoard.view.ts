import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_DASH_BOARD = "dash-board";

export class DashBoard extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_DASH_BOARD;
	}

	getDisplayText() {
		return "Example view";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h4", { text: "Dash Board" });
	}

	async onClose() {
		// Nothing to clean up.
	}
}
