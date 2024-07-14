import {App, stringifyYaml} from "obsidian"
import { Props, Utilitiesfile } from "./Utilitiesfile"




export class Habit {
   private readonly app: App
    constructor(app: App) {
        this.app = (app)
    }

        async create({name, properties}  : Props) {
            const fileutilities = new Utilitiesfile(this.app)
            const date = new Date();
            if (properties !== undefined) properties.Created = date.getFullYear() + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getDate();
            try {
            if(await fileutilities.Existing({name : `${name}.md`}))
                {
                    throw new Error(`File ${name}.md already exists`)
                }else{
                    this.app.vault.create(`${name}.md`, `---\n${stringifyYaml(properties)}\n---`)//`# ${properties}`)
                }
            } catch (error) {
                console.error(error)
            }
        }
        
        async getProperties({name}  : Props) {
            const fileutilities = new Utilitiesfile(this.app)
            console.log(await fileutilities.GetProperties({name: `${name}.md`}).catch((error) => {console.error(error)}))
        }
 
        async setProperties ({name, properties}  : Props) {
            const fileutilities = new Utilitiesfile(this.app)
            const date = new Date();
           if (properties !== undefined) properties.Modified = date.getFullYear() + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getDate();
           console.log(await fileutilities.SetProperties({name: `${name}.md`, properties}).catch((error) => {console.error(error)}))
        }
        async get({name}  : Props) {
            const fileutilities = new Utilitiesfile(this.app)
            console.log(await fileutilities.GetJson({name: `${name}.md`}).catch((error) => {console.error(error)}))
        }

        async delete({name}  : Props) {
            const fileutilities = new Utilitiesfile(this.app)
            fileutilities.delete({name: `${name}.md`})
        }
}

