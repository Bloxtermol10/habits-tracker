import Button from "@atlaskit/button/new"
import { Habit  } from "entities/Habit";
import {Props, DaysEnum} from "entities/Utilitiesfile";
import useApp from "hooks/useApp";
import { MouseEvent } from "react";
import styled from "styled-components";

const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
`
const date = new Date();

const obj : Props = {
        name : "6-10",
        properties:{
        description : "hola soy nuevo",
        frecuency : [DaysEnum.EveryDay],
    } 
}
const objedit : Props = {
        name : "6-10",
        properties:{
        description : "hola soy editado",
        frecuency : [DaysEnum.Monday, DaysEnum.Tuesday, DaysEnum.Wednesday, DaysEnum.Thursday, DaysEnum.Friday, DaysEnum.Saturday, DaysEnum.Sunday],
        Created: "2024/07/13"
    } 
}






function DashBoard() {


    const app = useApp()
    const habit = new Habit(app)
    const props : Props = obj
    const propsedit : Props = objedit

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        habit.create(props)
        habit.getProperties(props)
        habit.get(props)
    }

    const handleClickEdit = (event: MouseEvent<HTMLButtonElement>) => {
        habit.setProperties(propsedit)
    }
    const handleClickdelete = (event: MouseEvent<HTMLButtonElement>) => {
        habit.delete(props)
    }
    return (

        <Container>
            <h1>
                Habits Tracker
            </h1>
            <Button appearance="primary" onClick={handleClick}>
                ¡Nuevo habito!
            </Button>
            <Button appearance="primary" onClick={handleClickEdit}>
                ¡Editar habito!
            </Button>
            <Button appearance="primary" onClick={handleClickdelete}>
                ¡Eliminar habito!
            </Button>
        </Container>

    )
}
export default DashBoard
