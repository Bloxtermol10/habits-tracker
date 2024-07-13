import {App, stringifyYaml} from "obsidian"
import { Utilitiesfile } from "./Utilitiesfile"
import { load } from "js-yaml"
export interface PropsCreate{
    name: string
    properties: {}
}
export enum FrequencyEnum {
    Daily = "Daily",
    Weekly = "Weekly",
    Monthly = "Monthly",
    Yearly = "Yearly",
    
}

export enum DaysEnum{
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday",
}

export type Frequency = 
     FrequencyEnum.Daily |
     FrequencyEnum.Weekly |
     FrequencyEnum.Monthly |
     FrequencyEnum.Yearly |
     DaysEnum[]





const myFrequency : Frequency = [DaysEnum.Monday, DaysEnum.Friday]
const myFrequency2 : Frequency = FrequencyEnum.Daily


export class Habit {
   private readonly app: App
    constructor(app: App) {
        this.app = (app)
    }

    async Createhabit({name, properties}  : PropsCreate) {
        const fileutilities = new Utilitiesfile(this.app)
        if(await fileutilities.Existingfile({patch : `${name}.md`}))
            {
                console.error(`File ${name}.md already exists`)
            }else{
                this.app.vault.create(`${name}.md`, `---\n${stringifyYaml(properties)}\n---`)//`# ${properties}`)
            }
            fileutilities.Openfile({patch: `${name}.md`})
        }
        
        async Readhabitproperties({name}  : PropsCreate) {
            const fileutilities = new Utilitiesfile(this.app)
            const properties = await fileutilities.Readpropertiesfile({patch: `${name}.md`})
            console.log(properties)
                
        }

        async Readfile({name}  : PropsCreate) {
            const fileutilities = new Utilitiesfile(this.app)
            const contentfile = await fileutilities.Readfile({patch: `${name}.md`})
            console.log(contentfile)       
        }

        
        

    
   
    }
