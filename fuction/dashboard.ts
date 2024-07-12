import {App} from "obsidian"

export class DashBoard {
    constructor(app: App) {
        this.app = app
    }
    app: App
}