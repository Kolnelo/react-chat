import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const Invite = ({ userName, roomName, onAccept = f => f, onDecline = f => f}) => (
    <div className={'invite'}>
        <span>Вас приглашает <strong>{userName}</strong> в чат: <strong>{roomName}</strong></span>
        <button className={'btn btn-secondary'} onClick={() => onAccept()}>Принять</button>
        <button className={'btn btn-secondary'} onClick={() => onDecline()}>Отклонить</button>
    </div>
);

Invite.propTypes = {
    userName: PropTypes.string,
    roomName: PropTypes.string,
    onAccept: PropTypes.func,
    onDecline: PropTypes.func
};

export default Invite;