import React from 'react';
import TextForm from "../text-form";
import './styles.css';
import PropTypes from 'prop-types';

const UserItem = ({user, onInviteUser = f => f}) => (
    <div className={'user-item'}>
        <div className={'user-item__name'}>
            {user.name}
        </div>
        <TextForm btnName={'Пригласить'} smallSize={true} onInputText={(roomName) => onInviteUser(user.id, roomName)}/>
    </div>
);

UserItem.propTypes = {
    user: PropTypes.object,
    onInviteUser: PropTypes.func
};

export default UserItem;