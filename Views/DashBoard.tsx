import Button from "@atlaskit/button/new"
import { Habit  } from "entities/Habit";
import { Topics } from "entities/Topics";
import {Props, DaysEnum} from "entities/Utilitiesfile";
import useApp from "hooks/useApp";
import { MouseEvent } from "react";
import styled from "styled-components";
import { obj, objedit } from "./dev/mooks/mook_habit";

const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
`






function DashBoard() {


    const app = useApp()
    const habit = new Habit(app)
    const topics = new Topics(app, 'obsidian.db')
    const props : Props = obj
    const propsedit : Props = objedit

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        // habit.create(props)
        // habit.getProperties(props)
        // habit.get(props)
        topics.createtableareas()
       topics.setareas('Trabajo')
       console.log(topics.getareas()) 
 
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
