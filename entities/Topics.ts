import { App } from "obsidian";

import { Utilitiesfile } from "./Utilitiesfile";
import { nextTick } from "process";

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
async deletearea(area : string) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `DELETE FROM areas WHERE name = '${area}'`,
        params: []
    };
   return await this.fetch(requestBody)
}

async create(){
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `CREATE TABLE IF NOT EXISTS topics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            area TEXT,
            name TEXT
        )`,
        params: []
    };
   return await this.fetch(requestBody)
}

async get() {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'get',
        query: "SELECT * FROM topics",
        params: []
    };
    return await this.fetch(requestBody)
}

async getbyarea(area : string) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'get',
        query: `SELECT * FROM topics WHERE area = '${area}'`,
        params: []
    };
    return await this.fetch(requestBody)
}
async set(topic : string,area : string) {
    let existarea = false
    const areas = await this.getareas()
    areas.rows.forEach(element => {
       if(element.name === area) existarea = true
    });
    if(!existarea) throw new Error('Area does not exist')
    const topics = await this.get()
    topics.rows.forEach(element => {
        if(element.name === topic) throw new Error('Topic already exists')
     });
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `INSERT INTO topics (name, area) VALUES ('${topic}','${area}')`,
        params: []
    };
   return await this.fetch(requestBody)
   
}
async deletebyarea(area : string) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `DELETE FROM topics WHERE area = '${area}'`,
        params: []
    }
    return await this.fetch(requestBody)
}
async delete(topic : string) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `DELETE FROM topics WHERE name = '${topic}'`,
        params: []
    }
    return await this.fetch(requestBody)
}
}

