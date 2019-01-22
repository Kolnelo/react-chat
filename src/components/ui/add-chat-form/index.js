import React from 'react';
import TextForm from '../text-form';
import './styles.css';
import PropTypes from 'prop-types';

const AddChatForm = ({onAddChat = f => f}) => (
    <div className={'add-chat-form'}>
        <h1>Введите название комнаты:</h1>
        <TextForm onInputText={onAddChat}/>
    </div>
);

AddChatForm.propTypes = {
    onAddChat: PropTypes.func
};

export default AddChatForm;