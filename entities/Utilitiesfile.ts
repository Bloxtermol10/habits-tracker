import {App,stringifyYaml} from "obsidian"
import { load, loadAll } from "js-yaml"
import path from "path"

export interface Props{
    name: string
    properties?: {
        description: string
        frecuency: DaysEnum[]
        Created?: string 
        Modified?: string
    }
}

export enum DaysEnum{
    EveryDay = "Every Day",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday",
}
export class Utilitiesfile {
    private readonly app: App
    constructor(app: App) {
        this.app = (app)
    }

    async Create({name, properties}  : Props) {
        const date = new Date();
        if (properties !== undefined) properties.Created = date.getFullYear() + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getDate();
        try {
        if(await this.Existing({name}))
            {
                throw new Error(`File ${name}.md already exists`)
            }else{
                this.app.vault.create(`${name}`, `---\n${stringifyYaml(properties)}\n---`)//`# ${properties}`)
            }
        } catch (error) {
            console.error(error)
            return error
        }
    }
    async Existing({name} : Props) {
       const file = await this.Get({name})
       if(file === null){
           return false
       }
           return true
    }
    async Get({name} : Props) {

        const file = this.app.vault.getFileByPath(name)
        if (file === null) {
            return file;
        } else {
            return file ;
        }
    }

    async Open({name} : Props) {
        await this.Get({name}).then((file) => {
            if (file === null) throw new Error('File not found')
            this.app.workspace.getLeaf().openFile(file)   
        }).catch((error) => {
            console.error(error)
        })
    }

    private async GetContent({ name }: Props){
        const file = await this.Get({ name });
        if (file === null) throw new Error('File not found')
            const text = await this.app.vault.read(file);
        return text;
    }
        
    async GetProperties({name}  : Props) {
        const text = await this.GetContent({ name });
        return load(text.split('---')[1])
    }

    async SetProperties({name, properties}  : Props) {
        const date = new Date();
        if (properties !== undefined) properties.Modified = date.getFullYear() + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getDate();
        const text = await this.GetContent({ name });
        const antsfile = text.split('---')[0]
        const propertiesfile = text.split('---')[1] = stringifyYaml(properties)
        const restfile = text.split('---')[2]
        const envproperties = antsfile + '---\n' + propertiesfile + '\n---\n' + restfile
        const file = this.Get({name}).then((file) => {
            if (file === null) throw new Error('File not found')
            const text = this.app.vault.modify(file,envproperties);
        }).catch((error) => {
            return error
        })
        return envproperties
    }
    async GetJson({name}  : Props) {
        const text = await this.GetContent({ name });
        try {
        const filepart = [{}];
        const documents = loadAll(text);
           documents.forEach((doc) => {
            doc && filepart.push({doc});
           });
           return filepart 
       } catch (error) {
           return error;
       }    
    }

    async delete({name}  : Props) {
        const file = this.Get({name}).then((file) => {
            if (file === null) throw new Error('File not found')
                this.app.vault.delete(file)
        })
    }

    dbpath(name : string) {
        return path.resolve((this.app.vault.adapter as any).basePath, this.app.vault.configDir ,name).replace(/\\/g, '/')
    }
}