import React, { Component } from 'react';
import './App.css';
import ioApi from './ioAPI';
import {StateContext} from './components/state-context';
import {SetUserName,
    AddChatRoom,
    Invites,
    ChatRooms
} from './components/containers';

class App extends Component {
  constructor(props){
    super(props);
    /*
      Состояние состоит из: массива комнат chatRooms (комната room {name, messages, chatUsers})
                            объект пользователя user {id, name}
                            массив приглашений inviteList (invite {id, roomName, userName})
    */
    this.state = {
      chatRooms: [],
      user:{},
      inviteList: []
    };

    //привязываем this
    this.setUser = this.setUser.bind(this);
    this.addChatRoom = this.addChatRoom.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.addChatUser = this.addChatUser.bind(this);
    this.removeChatUser = this.removeChatUser.bind(this);
    this.addInvite = this.addInvite.bind(this);
    this.removeInvite = this.removeInvite.bind(this);
    this.joinToRoom = this.joinToRoom.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.loginIn = this.loginIn.bind(this);
  }
/*
||||||||||||||||||||||||||||||||||||||||||||||||||||||
      МЕТОДЫ ДЛЯ МАНИПУЛЯЦИИ СОСТОЯНИЕМ
||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/
  setUser(user){
    if(user.name === '') return;
    this.setState({
      user
    });
  }

  addMessage({userId, userName, roomName, msg, date}){
    const {chatRooms} = this.state;
    const newRooms = chatRooms.map( room => {
      if(room.name !== roomName) return room;
      return {
        ...room,
        messages: [...room.messages, {userId, userName, msg, date}]
      };
    });
    this.setState({chatRooms: newRooms});
  }

  addChatRoom(newRoom){
    const {chatRooms} = this.state;
    if(chatRooms.find(room => room.name === newRoom.name)) return;

    this.setState({
      chatRooms: [...chatRooms, newRoom]
    });
  }

  addChatUser({user, roomName}){
    const {chatRooms} = this.state;
    const newRooms = chatRooms.map( room => {
      if(room.name !== roomName) return room;
      return {
        ...room,
        chatUsers: [...room.chatUsers, user]
      };
    });
    this.setState({chatRooms: newRooms});
  }

  removeChatUser({user, roomName}){
    const {chatRooms} = this.state;
    const newRooms = chatRooms.map( room => {
      if(room.name !== roomName) return room;
      return {
        ...room,
        chatUsers: room.chatUsers.filter(u => u.id !== user.id)
      };
    });
    this.setState({chatRooms: newRooms});
  }

  addInvite(invite){
    const {inviteList} = this.state;
    if(inviteList.find(item => item.id === invite.id)) return;
    this.setState({inviteList: [...inviteList, invite]});
  }

  removeInvite(id){
    const {inviteList} = this.state;
    const newInviteList = inviteList.filter(item => item.id !== id);
    this.setState({inviteList: newInviteList});
  }
/*
||||||||||||||||||||||||||||||||||||||||||||||||||||||
      МЕТОДЫ ДЛЯ ioAPI
||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/
  joinToRoom(roomName){
    if(this.state.chatRooms.find(room => room.name === roomName)) return;
    if(roomName.trim() === '') return;
    ioApi.joinToRoom(roomName);
  }

  loginIn(userName){
    if(this.state.user.name) return;
    ioApi.loginIn(userName);
  }

  sendMessage(roomName, msg){
    if(!this.state.chatRooms.find(room => room.name === roomName)) return;
    if(msg.trim() === '') return;
    ioApi.sendMessage(roomName, msg);
  }

  inviteUser(invitedId, roomName){
    if(roomName.trim() === '') return;
    ioApi.inviteUser(invitedId, roomName);
  }
/*
||||||||||||||||||||||||||||||||||||||||||||||||||||||
      МЕТОДЫ ЖИЗНЕННОГО ЦИКЛА
||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/
  componentDidMount() {
    //подписываемся на события
    ioApi.onLoggedIn(this.setUser);
    ioApi.onJoinToRoom(this.addChatRoom);
    ioApi.onNewMessage(this.addMessage);
    ioApi.onJoinToRoomAnotherUser(this.addChatUser);
    ioApi.onLeaveToRoomAnotherUser(this.removeChatUser);
    ioApi.onInvite(this.addInvite);
  }
/*
||||||||||||||||||||||||||||||||||||||||||||||||||||||
      RENDER
||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/
  render() {
    return (
      <StateContext.Provider value={{state: this.state, actions: this, ioApi: ioApi}}>
        <div>
          {
            (!this.state.user.name) ?
                <SetUserName/> :
                <div>
                  <AddChatRoom/>
                  <Invites/>
                  <ChatRooms/>
                </div>
          }
        </div>
      </StateContext.Provider>
    );
  }
}

export default App;
