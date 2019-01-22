import SetUserNameForm from './ui/set-user-name-form';
import AddChatForm from './ui/add-chat-form';
import stateConnect from './state-connect';
import InviteList from './ui/invite-list';
import ChatRoomList from './ui/chat-room-list';

//производим подключение состояния к презентационным компонентам
export const SetUserName = stateConnect(
    (state, actions) => ({
        onSetUserName: actions.loginIn
    })
)(SetUserNameForm);

export const AddChatRoom = stateConnect(
    (state, actions) => ({
        onAddChat: actions.joinToRoom
    })
)(AddChatForm);

export const Invites = stateConnect(
    (state, actions) =>({
        inviteList: state.inviteList,
        onAcceptInvite: (id, roomName) => {actions.removeInvite(id); actions.joinToRoom(roomName)},
        onDeclineInvite: actions.removeInvite
    })
)(InviteList);

export const ChatRooms = stateConnect(
    (state, actions) =>({
        chatRooms: state.chatRooms,
        onSendMessage: actions.sendMessage,
        onInviteUser: (invitedId, roomName) => actions.inviteUser(invitedId, roomName)
    })
)(ChatRoomList);