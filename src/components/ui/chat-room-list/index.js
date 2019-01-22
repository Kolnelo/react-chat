import React from 'react';
import ChatRoom from "../chat-room";
import PropTypes from 'prop-types';

const ChatRoomList = ({chatRooms = [], onSendMessage = f => f, onInviteUser = f => f}) => (

    <div className={'chat-room-list'}>
        {chatRooms.map( (chRoom) =>
            <ChatRoom key={chRoom.name}
                      roomName={chRoom.name}
                      onSendMessage={(msg) => onSendMessage(chRoom.name, msg)}
                      messages={chRoom.messages}
                      chatUsers={chRoom.chatUsers}
                      onInviteUser={onInviteUser}
            />
        )}
    </div>
);

ChatRoomList.propTypes = {
    chatRooms: PropTypes.array,
    onSendMessage: PropTypes.func,
    onInviteUser: PropTypes.func
};

export default ChatRoomList;