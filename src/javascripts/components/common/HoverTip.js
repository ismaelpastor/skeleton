import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const HoverTip = props => {
  const tooltip = <Tooltip id="tooltip">{props.message}</Tooltip>;
  return (
    <OverlayTrigger placement={props.placement} overlay={tooltip}>
      {props.children}
    </OverlayTrigger>
  );
};

export default HoverTip;
