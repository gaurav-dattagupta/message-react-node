import React, { useEffect, useState } from 'react';
import { usePrevious } from '../../../common/utils';
import '../../styles/MessagePanel.css';

interface EnterMessageProps {
  addMessage: (msg: string) => void;
  selectedChannel: string;
  isDisabled: boolean;
  maxLength?: number;
}

function EnterMessage(props: EnterMessageProps): React.ReactElement {
  const { addMessage, selectedChannel, isDisabled, maxLength } = props;
  const [newMessage, setNewMessage] = useState('');

  const previousChannel = usePrevious(selectedChannel);

  useEffect(() => {
    if (previousChannel !== selectedChannel) {
      setNewMessage('');
    }
  }, [selectedChannel, previousChannel]);

  const submitMessage = (_: React.MouseEvent) => {
    addMessage(newMessage);
    setNewMessage('');
  };

  const generatecharacterRemaining = () =>
    maxLength === undefined ? null : (
      <div className="characters-remaining">{`${maxLength - newMessage.length} characters left`}</div>
    );

  return (
    <div className="add-message">
      <div className="user-message">
        <textarea
          disabled={isDisabled}
          maxLength={maxLength}
          placeholder="Enter Your Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        {generatecharacterRemaining()}
      </div>
      <button type="submit" className="add-message-btn primary" disabled={!newMessage} onClick={submitMessage}>
        Submit
      </button>
    </div>
  );
}

export default EnterMessage;
