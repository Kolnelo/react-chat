import React from "react";
import {StateContext} from "./state-context";

// функция необходимая для подключения состояния презентационному компоненту
const stateConnect = (handler) => (ComposedComponent) => (props) => (
    <StateContext.Consumer>
        {({state, actions}) => (
            <ComposedComponent  {...handler(state, actions)} {...props}/>
        )}
    </StateContext.Consumer>
);

export default stateConnect;