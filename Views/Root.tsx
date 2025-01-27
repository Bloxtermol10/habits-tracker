import { App } from "obsidian";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setApp } from "redux/states/app.state";

interface Props {
    app: App,
}

function Root({ app, }: Props) {
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(setApp(app));
        } catch (error) {
            console.error(error);
        }
    }, [])

    return null
}
export default Root