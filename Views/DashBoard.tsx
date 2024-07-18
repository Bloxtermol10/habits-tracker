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

    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        // habit.create(props)
        // habit.getProperties(props)
        // habit.get(props)
       await topics.createtableareas()
      // console.log("set area : ", await topics.setareas('Empresa'))
       console.log("get all areas", await topics.getareas())
       await topics.create()
       await topics.set('Prueba','Empresa') 
       await topics.set('Prueba2','Empresa')
       await topics.set('Prueba3','Empresa')
       await topics.set('Prueba4','Empresa')
       await topics.set('Prueba5','Empresa')
       const result = await topics.get()
       console.log("get topics :", result.rows)
       console.log("get topics by area :", await topics.getbyarea('Trabajo'))
    }
    
    const handleClickEdit = (event: MouseEvent<HTMLButtonElement>) => {
        habit.setProperties(propsedit)
    }
    const handleClickdelete = async (event: MouseEvent<HTMLButtonElement>) => {
        habit.delete(props)
        await topics.delete('Prueba')
        topics.deletebyarea('Trabajo')
        topics.deletearea('Trabajo')
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
