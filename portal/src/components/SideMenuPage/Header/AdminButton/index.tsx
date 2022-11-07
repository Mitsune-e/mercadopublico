import React from 'react';

import { FaUserFriends } from 'react-icons/fa';
import { PageHeaderButtons, PageUserButton } from './styles';

export const AdminButton: React.FC<any> = (props) => {

  if (props.admin) {
    return (
      <PageHeaderButtons>
        <PageUserButton to={"/listarParticipantes"}>
          <FaUserFriends />
        </PageUserButton>
      </PageHeaderButtons>
    );
  }
  return null
}
