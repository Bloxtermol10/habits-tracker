import Button from "@atlaskit/button/new"
import { Habit, PropsCreate } from "entities/Habit";
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
const obj = {
    clave: "valor",
    hola: "mundo, como va?, hola?",
    fecha:"2024/07/19",
    completado:true,
    Frecuecia : ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"],
    FechaCreacion: date.getFullYear() + "/" + (date.getMonth() + 1).toString().padStart(2, '0') + "/" + date.getDate(),
    } 



function DashBoard() {


    const app = useApp()
    const habit = new Habit(app)
    const props : PropsCreate = {name: "6-10", properties: obj}

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        habit.Createhabit(props)
        habit.Readhabitproperties(props)
        habit.Readfile(props)
        // const file = app.vault.getFileByPath("Habits.md");
        // if (!file) {
        //     const newFile = app.vault.create("Habits.md", "# Hola");
        //     newFile
        //         .then((file) => {
        //             app.workspace.getLeaf().openFile(file);
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        // } else {
        //     app.workspace.getLeaf().openFile(file);
        // }

    }

    return (

        <Container>
            <h1>
                Habits Tracker
            </h1>
            <Button appearance="primary" onClick={handleClick}>
                ¡Nuevo habito!
            </Button>
        </Container>

    )
}
export default DashBoard
