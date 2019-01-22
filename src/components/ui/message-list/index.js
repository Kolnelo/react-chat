import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const MessageList = ({messages = []}) => (
    <ul className={'message-list'}>
        {messages.map((msgItem, i) =>
            <li className={'message-list-item'} key={i}>
                <strong>{msgItem.userName}</strong>
                <span className={'message-list-date'}>{` ${msgItem.date}`}</span>
                {': ' + msgItem.msg}
            </li>
        )}
    </ul>
);

MessageList.propTypes = {
    messages: PropTypes.array
};

export default MessageList;