import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import LeadPencilIcon from 'mdi-react/LeadPencilIcon';
import CheckIcon from 'mdi-react/CheckIcon';
import CancelIcon from 'mdi-react/CancelIcon';
import HoverTip from '../common/HoverTip';

export const labelRole = (intl, role) => {
  let roleAux;
  roleAux = '';

  if (role !== undefined && role['0'] !== undefined) {
    if (role['0'].authority !== undefined) {
      roleAux = role['0'].authority;
    } else if (role['0'].name !== undefined) {
      roleAux = role['0'].name;
    }
  }

  switch (roleAux) {
    case 'ROLE_ADMIN':
      return intl.formatMessage({ id: 'users.admin' });
    case 'ROLE_OWNER':
      return intl.formatMessage({ id: 'users.owner' });
    case 'ROLE_USER':
      return intl.formatMessage({ id: 'users.user' });
    default:
      return '';
  }
};

const UserRow = props => (
  <tr>
    {/* <td>{props.id}</td> */}
    <td>{`${props.firstname} ${props.lastname}`}</td>
    <td className="align-center">
      {props.enabled ? <CheckIcon /> : <CancelIcon />}
    </td>
    <td>{props.email}</td>

    <td>{labelRole(props.intl, props.authorities)}</td>

    <td className="align-center">
      <HoverTip
        placement="top"
        message={props.intl.formatMessage({ id: 'users.edit' })}
      >
        <Link to={`/user/${props.id}`} params={{ id: props.id }}>
          <LeadPencilIcon className="icons" />
        </Link>
      </HoverTip>
    </td>
  </tr>
);

export default injectIntl(UserRow);
