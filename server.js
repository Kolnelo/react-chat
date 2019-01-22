const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const C = require('./src/constants');

app.use(express.static(__dirname + "/build"));

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', function(socket){
    console.log(`user ${socket.id} connected`);

    let addedUser = false;

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`);
    });

    //Оповещаем все комнаты об уходе пользователя
    socket.on('disconnecting', () => {
        if(!socket.rooms) return;
        for(let roomName in socket.rooms){
            io.in(roomName).emit(C.LEAVE_TO_ROOM_USER, {user: {id: socket.id, name: socket.userName}, roomName});
        }
    });

    //Ставим флаг, что пользователь добавлен и сохраняем его имя в сокет
    socket.on(C.LOGIN_IN, ({userName}) => {
        if (addedUser) return; //проверяем добавлен ли пользователь

        socket.userName = userName;

        addedUser = true;

        socket.emit(C.LOGGED_IN, {
            id: socket.id,
            name: userName
        });
    });

    //отпарвляем сообщение в указанную комнату
    socket.on(C.NEW_MESSAGE, (msgData) => {
        const now = new Date();
        io.in(msgData.roomName).emit(C.NEW_MESSAGE, {...msgData,
                                                        date: `${now.getHours()}:${now.getMinutes()}`,
                                                        userId: socket.id,
                                                        userName: socket.userName
        });
    });

    //добавляем пользователя в комнату
    socket.on(C.JOIN_TO_ROOM, ({name}) => {
        if(isAddedUser(socket.id, name)) return;
        const chatUsers = getRoomUsers(name);
        socket.join(name);
        socket.emit(C.JOIN_TO_ROOM, {name, messages: [], chatUsers});
        //оповещаем других пользователей о новом пользвателе в комнате
        socket.to(name).emit(C.JOIN_TO_ROOM_USER, {user: {id: socket.id, name: socket.userName}, roomName: name});

    });

    //отправляем приглашение пользователю
    socket.on(C.INVITE, ({invitedId, roomName}) => {
        if (io.sockets.connected[invitedId]) {
            io.sockets.connected[invitedId].emit(C.INVITE, {id: socket.id, userName: socket.userName, roomName: roomName});
        }
    });

});

//для получение массива пользователей
function getRoomUsers(chatName) {
    return getUserSocketsByRoomName(chatName).map((socket) => {
        return{
            id: socket.id,
            name: socket.userName
        }
    });
}

//для получения сокетов находящихся в комнате
function getUserSocketsByRoomName(roomName) {
    const clients = getUsersIdArrByRoomName(roomName);
    return clients.map((clientId) => io.sockets.connected[clientId]);
}

//для получения массива id сокетов находящихся в комнате
function getUsersIdArrByRoomName(roomName) {
    const room = io.sockets.adapter.rooms[roomName];
    if(!room) return [];
    return Object.keys(io.sockets.adapter.rooms[roomName].sockets);
}

//для проверки добавлен ли пользователь в комнату
function isAddedUser(userId, roomName) {
    const userIds = getUsersIdArrByRoomName(roomName);
    return userIds.includes(userId);
}

const port = 3001;

http.listen(port, () => {
    console.log('listening on port ', port);
});

