import React from 'react';
import './styles.css';
import MessageList from '../message-list';
import TextForm from '../text-form';
import UserList from "../user-list";
import PropTypes from 'prop-types';

const ChatRoom = ({messages = [], roomName, chatUsers = [], onSendMessage = f => f, onInviteUser = f => f}) => {

    function handleSendMessage(msg) {
        if(msg === '') return;
        onSendMessage(msg);
    }

    return(
        <div className={'chat-room'}>
            <h1>Чат: {roomName}</h1>

            <MessageList messages={messages}/>

            <TextForm onInputText={handleSendMessage} smallSize={true} placeholder={'Напишите сообщение...'} btnName={'Отправить'}/>

            <UserList users={chatUsers} onInviteUser={onInviteUser}/>

        </div>
    );
};

ChatRoom.propTypes = {
    messages: PropTypes.array,
    roomName: PropTypes.string,
    chatUsers: PropTypes.array,
    onSendMessage: PropTypes.func,
    onInviteUser: PropTypes.func
};

export default ChatRoom;