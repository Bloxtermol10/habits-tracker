import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
	name: "app",
	initialState: {
		app: null,
	},
	reducers: {
		setApp: (_state, action) => action.payload,
		clearApp: (state) => {
			state.app = null;
		},
	},
});

export const { setApp, clearApp } = appSlice.actions;
