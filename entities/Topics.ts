import { App } from "obsidian";

import { Utilitiesfile } from "./Utilitiesfile";

interface Props {
    dbpath: string
    method: 'run' | 'all' | 'get';
    query: string
    params: [] 
}

interface respondapi { 
    message: string
    rows: [{
        id: number
        name: string
    }]
}

export class Topics {
    private readonly app: App
    namedb: string
    constructor(app: App , namedb: string) {
        this.app = (app)
        this.namedb = (namedb)
    }
private async fetch(body: Props) {
    try {
        const response = await fetch('http://localhost:3000/sqlite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data: respondapi = await response.json(); 
        return data; 
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}
private getdbpath() {
    const utilities = new Utilitiesfile(this.app)
    return utilities.dbpath(this.namedb)
}
async createtableareas(){
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `CREATE TABLE IF NOT EXISTS areas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
        )`,
        params: []
    };
   return await this.fetch(requestBody)
}

 async getareas() {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'all',
        query: "SELECT * FROM areas",
        params: []
    };
     return await this.fetch(requestBody) 
}
async setareas(area : string) {
     const areas = await this.getareas()
     areas.rows.forEach(element => {
        if(element.name === area) throw new Error('Area already exists')
     });
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `INSERT INTO areas (name) VALUES ('${area}')`,
        params: []
    };
   return await this.fetch(requestBody)
   
}
}

