import React from 'react';
import Invite from '../invite';
import PropTypes from 'prop-types';

const InviteList = ({inviteList = [], onAcceptInvite = f => f, onDeclineInvite = f => f}) => (
    <div>
        {inviteList.map((inv) =>
            <Invite key={inv.id}
                    roomName={inv.roomName}
                    userName={inv.userName}
                    onAccept={() => onAcceptInvite(inv.id, inv.roomName)}
                    onDecline={() => onDeclineInvite(inv.id)}
            />
        )}
    </div>
);

InviteList.propTypes = {
    inviteList: PropTypes.array,
    onAcceptInvite: PropTypes.func,
    onDeclineInvite: PropTypes.func
};

export default InviteList;