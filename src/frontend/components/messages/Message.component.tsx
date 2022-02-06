import React from 'react';
import { Message } from '../../../common/types';
import { getMessageDateTime } from '../../../common/utils';
import '../../styles/MessagePanel.css';

interface MessageProps {
  message: Message;
  now: Date;
}

function MessageView(props: MessageProps): React.ReactElement {
  const { message, now } = props;

  return (
    <div className="message">
      <div className="message-top">
        <div className="message-body">{message.text}</div>
      </div>
      <div className="message-footer">
        <div className="message-user left">{message.author}</div>
        <div className="message-period right">{getMessageDateTime(message.created, now)}</div>
      </div>
    </div>
  );
}

export default MessageView;
