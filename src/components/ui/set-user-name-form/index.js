import React from 'react';
import './styles.css';
import TextForm from '../text-form';
import PropTypes from 'prop-types';

const SetUserNameForm =  ({onSetUserName = f => f}) => (
        <div className={'set-user-name-form'}>
            <h1>Введите имя:</h1>
            <TextForm onInputText={onSetUserName}/>
        </div>
);

SetUserNameForm.propTypes = {
    onSetUserName: PropTypes.func
};

export default SetUserNameForm;