import { Props, DaysEnum } from "entities/Utilitiesfile";

const date = new Date();

export const obj : Props = {
        name : "6-10.md",
        properties:{
        description : "hola soy nuevo",
        frecuency : [DaysEnum.EveryDay],
    } 
}
export const objedit : Props = {
        name : "6-10.md",
        properties:{
        description : "hola soy editado",
        frecuency : [DaysEnum.Monday, DaysEnum.Tuesday, DaysEnum.Wednesday, DaysEnum.Thursday, DaysEnum.Friday, DaysEnum.Saturday, DaysEnum.Sunday],
        Created: "2024/07/13"
    } 
}
