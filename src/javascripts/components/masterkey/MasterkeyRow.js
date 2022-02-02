import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import LeadPencilIcon from 'mdi-react/LeadPencilIcon';
import HoverTip from '../common/HoverTip';

const MasterkeyRow = props => (
  <tr>
    {/* <td>{props.id}</td> */}
    <td>{props.name}</td>
    <td>{moment(props.notBefore).format('DD/MM/YYYY HH:mm')}</td>
    <td>{moment(props.notAfter).format('DD/MM/YYYY HH:mm')}</td>
    <td className="align-center">
      <HoverTip
        placement="top"
        message={props.intl.formatMessage({ id: 'masterkeys.edit' })}
      >
        <Link to={`/masterkey/${props.id}`} params={{ id: props.id }}>
          <LeadPencilIcon className="icons" />
        </Link>
      </HoverTip>
    </td>
  </tr>
);

export default injectIntl(MasterkeyRow);
