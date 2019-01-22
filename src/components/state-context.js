import React from 'react';

export const defaultState = {
    chatRooms: [],
    user:{},
    inviteList: []
};

//контекст для передачи состояния и действий (манипуляции состоянием и io)
export const StateContext = React.createContext({
    state: defaultState,
    actions: {}
});