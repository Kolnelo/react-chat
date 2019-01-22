import io from 'socket.io-client';
import C from "./constants";

const chat = io('http://localhost:3001');

// объект для управления io
const ioApi = {
    //отправляем сообщение
    sendMessage(roomName, msg) {
        chat.emit(C.NEW_MESSAGE, {msg, roomName});
    },
    //подключаемся к комнате
    joinToRoom(roomName){
        chat.emit(C.JOIN_TO_ROOM, {name: roomName});
    },
    //регестрируем имя
    loginIn(userName){
        chat.emit(C.LOGIN_IN, {userName});
    },
    //приглашаем пользователя
    inviteUser(invitedId, roomName){
        chat.emit(C.INVITE, {invitedId, roomName});
    },
    //событие при успешной регистрации
    onLoggedIn(handler = f => f){
        chat.on(C.LOGGED_IN, (user) => {
            handler(user)
        });
    },
    //событие при появлении нового сообщения
    onNewMessage(handler = f => f){
        chat.on(C.NEW_MESSAGE, (msgData) => {
            handler(msgData)
        });
    },
    //событие при входе в комнату
    onJoinToRoom(handler = f => f) {
        chat.on(C.JOIN_TO_ROOM, (roomData) => {
            handler(roomData)
        });
    },
    //событие при входе другого пользователя в комнату
    onJoinToRoomAnotherUser(handler = f => f) {
        chat.on(C.JOIN_TO_ROOM_USER, (data) => {
            handler(data)
        });
    },
    //событие при выходе другого пользователя из комнаты
    onLeaveToRoomAnotherUser(handler = f => f) {
        chat.on(C.LEAVE_TO_ROOM_USER, (data) => {
            handler(data)
        });
    },
    //событие прихода приглашения
    onInvite(handler = f => f){
        chat.on(C.INVITE, (invite) => {
            handler(invite)
        });
    }
};

export default ioApi;