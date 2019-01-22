import React from 'react';
import './styles.css';
import UserItem from '../user-item';
import PropTypes from 'prop-types';

const UserList = ({users = [], onInviteUser = f => f}) => (
    <div className={'user-list'}>

        <div className={'user-list-title'}>
            Подключенные пользователи:
        </div>
        <div className={'user-list-content'}>
            {(users.length !== 0) ?
                <div>
                    {users.map((user) =>
                        <div key={user.id} className={'user-list-item'}>
                            <UserItem user={user} onInviteUser={onInviteUser}/>
                        </div>
                    )}
                </div>
                 :
                <div className={'user-list-empty'}>Пока никого нет</div>
            }
        </div>

    </div>
);

UserList.propTypes = {
    users: PropTypes.array,
    onInviteUser: PropTypes.func
};

export default UserList;