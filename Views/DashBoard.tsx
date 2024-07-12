import Button from "@atlaskit/button/new"
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




function DashBoard() {
    const app = useApp()


    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        const file = app.vault.getFileByPath("Habits.md");
        if (!file) {
            const newFile = app.vault.create("Habits.md", "# Hola");
            newFile
                .then((file) => {
                    app.workspace.getLeaf().openFile(file);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            app.workspace.getLeaf().openFile(file);
        }

    }

    return (

        <Container>
            <h1>
                Habits Tracker
            </h1>
            <Button appearance="primary" onClick={handleClick}>
                Crea un nuevo habito.
            </Button>
        </Container>

    )
}
export default DashBoard