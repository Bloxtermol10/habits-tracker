import {App, stringifyYaml} from "obsidian"
import { Props, Utilitiesfile } from "./Utilitiesfile"




export class Habit {
   private readonly app: App
    constructor(app: App) {
        this.app = (app)
    }

        async create({name, properties}  : Props) {
            const fileutilities = new Utilitiesfile(this.app)
            fileutilities.Create({name, properties})
        }
        
        async getProperties({name}  : Props) {
            const fileutilities = new Utilitiesfile(this.app)
            console.log(await fileutilities.GetProperties({name}).catch((error) => {console.error(error)}))
        }
 
        async setProperties ({name, properties}  : Props) {
            const fileutilities = new Utilitiesfile(this.app)
           console.log(await fileutilities.SetProperties({name, properties}).catch((error) => {console.error(error)}))
        }
        async get({name}  : Props) {
            const fileutilities = new Utilitiesfile(this.app)
            console.log(await fileutilities.GetJson({name}).catch((error) => {console.error(error)}))
        }

        async delete({name}  : Props) {
            const fileutilities = new Utilitiesfile(this.app)
            fileutilities.delete({name})
        }
}

