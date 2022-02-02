import React from 'react';
import { Link } from 'react-router-dom';

import LeadPencilIcon from 'mdi-react/LeadPencilIcon';
import moment from 'moment';
import { injectIntl } from 'react-intl';

// import { activeAccess } from './LockerHelpers';
import HoverTip from '../common/HoverTip';

const LockerRow = props => (
  <tr>
    {/*<td>{props.deviceId}</td>*/}
    <td>{props.brief_desc}</td>
    {/*<td>{props.description}</td>*/}
    {/* <td>{activeAccess(props.keys)}</td> */}
    <td>
      {'lastUpdate' in props &&
        props.lastUpdate !== null && (
          <div>
            {moment(props.lastUpdate.epochSecond * 1000).format(
              'DD/MM/YYYY HH:mm'
            )}
          </div>
        )}
    </td>
    <td className="align-center">
      <HoverTip
        placement="top"
        message={props.intl.formatMessage({ id: 'lockers.edit' })}
      >
        <Link to={`/locker/${props.deviceId}`} params={{ id: props.deviceId }}>
          <LeadPencilIcon className="icons" />
        </Link>
      </HoverTip>
    </td>
  </tr>
);

export default injectIntl(LockerRow);
