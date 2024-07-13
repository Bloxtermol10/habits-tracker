import { App, ItemView, WorkspaceLeaf } from "obsidian";
import { createRoot } from "react-dom/client";
import DashBoard from "./DashBoard";
import '@atlaskit/css-reset';
import { Provider } from 'react-redux'
import store from "redux/store";
import Root from "./Root";
import { Habit } from "entities/Habit";
export const VIEW_TYPE_DASH_BOARD = "dash-board";


export class DashBoardView extends ItemView {

	constructor(leaf: WorkspaceLeaf, app: App) {
		super(leaf);
		this.app = app;
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
		
		const MyHabit  = new Habit(this.app)


		createRoot(container).render(
			<Provider store={store}>
				<Root app={this.app} />
				<div className="dark">
					<DashBoard />
				</div>
			</Provider>
		);


	}

	async onClose() {
		// Nothing to clean up.
	}
}
