import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./states/app.state";
import { App } from "obsidian";

export interface AppStore {
	app: App;
}

const store = configureStore({
	reducer: {
		app: appSlice.reducer,
	},
});

export default store;
