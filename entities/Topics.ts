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
        area: string
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
async getareabyid(id : number) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'get',
        query: `SELECT * FROM areas WHERE id = ${id}`,
        params: []
    };
    return await this.fetch(requestBody)
}
async setareas(area : string) {
     const areas = await this.getareas()
     if (areas.rows !== undefined && areas.rows.length > 0) {
     areas.rows.forEach(element => {
        if(element.name === area) throw new Error('Area already exists')
     });
    }
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `INSERT INTO areas (name) VALUES ('${area}')`,
        params: []
    };
   return await this.fetch(requestBody)
   
}

async editarea(antarea : string,newarea : string) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `UPDATE areas SET name = '${newarea}' WHERE name = '${antarea}'`,
        params: []
    };
   return await this.fetch(requestBody)
}

async editareabyid(id : number,area : string) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `UPDATE areas SET name = '${area}' WHERE id = ${id}`,
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
    this.editforarea(area,'unassigned')
   return await this.fetch(requestBody)
}

async deleteareabyid(id : number) {
    const area = await this.getareabyid(id)
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `DELETE FROM areas WHERE id = ${id}`,
        params: []
    };
    this.editforarea(area.rows[0].name,'unassigned')
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
        method: 'all',
        query: "SELECT * FROM topics",
        params: []
    };
    return await this.fetch(requestBody)
}

async getbyarea(area : string) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'all',
        query: `SELECT * FROM topics WHERE area = '${area}'`,
        params: []
    };
    return await this.fetch(requestBody)
}
async set(topic : string,area : string) {
    let existarea = false
    const areas = await this.getareas()
    if (areas.rows !== undefined && areas.rows.length > 0) {
        areas.rows.forEach(element => {
           if(element.name === area) existarea = true
        });
    }
    if(!existarea) throw new Error('Area does not exist')
    const topics = await this.get()
    if (topics.rows !== undefined && topics.rows.length > 0) {
        topics.rows.forEach(element => {
            if(element.name === topic && element.area === area ) throw new Error('Topic already exists')
         });
    }
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `INSERT INTO topics (name, area) VALUES ('${topic}','${area}')`,
        params: []
    };
   return await this.fetch(requestBody)
   
}
async edit(anttopic : string,newtopic : string) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `UPDATE topics SET name = '${newtopic}' WHERE name = '${anttopic}'`,
        params: []
    };
    return await this.fetch(requestBody)
}
async editbyid(id : number,topic : string) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `UPDATE topics SET name = '${topic}' WHERE id = ${id}`,
        params: []
    };
    return await this.fetch(requestBody)
}
async editbyidall(id : number,topic : string,area : string) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `UPDATE topics SET name = '${topic}', area = '${area}' WHERE id = ${id}`,
        params: []
    };
    return await this.fetch(requestBody)
}

editforarea(antarea : string,newarea : string) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `UPDATE topics SET area = '${newarea}' WHERE area = '${antarea}'`,
        params: []
    };
    return this.fetch(requestBody)
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

async deletebyid(id : number) {
    const requestBody : Props = {
        dbpath:  this.getdbpath(),
        method: 'run',
        query: `DELETE FROM topics WHERE id = ${id}`,
        params: []
    }
    return await this.fetch(requestBody)
}
}

