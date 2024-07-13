import {App, stringifyYaml} from "obsidian"
import { Utilitiesfile } from "./Utilitiesfile"
import { load } from "js-yaml"
import { themeColorModes } from "@atlaskit/tokens/dist/types/theme-config"
import { error } from "console"
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

export class Habit {
   private readonly app: App
    constructor(app: App) {
        this.app = (app)
    }

    async CreateHabit({name, properties}  : PropsCreate) {
        const fileutilities = new Utilitiesfile(this.app)
        try {
        if(await fileutilities.ExistingFile({patch : `${name}.md`}))
            {
                throw new Error(`File ${name}.md already exists`)
            }else{
                this.app.vault.create(`${name}.md`, `---\n${stringifyYaml(properties)}\n---`)//`# ${properties}`)
            }
        } catch (error) {
            console.error(error)
        }
    }
        
        async ReadHabitProperties({name}  : PropsCreate) {
            const fileutilities = new Utilitiesfile(this.app)
            await fileutilities.ReadPropertiesFile({patch: `${name}.md`}).catch((error) => {console.error(error)})              
        }

        async ReadFile({name}  : PropsCreate) {
            const fileutilities = new Utilitiesfile(this.app)
            await fileutilities.ReadFile({patch: `${name}.md`}).catch((error) => {console.error(error)})
        }

    }
