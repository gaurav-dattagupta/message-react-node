import React, { Suspense, useEffect, useState } from 'react';
import EnterMessage from '../editor/EnterMessage.component';
import { getChannelMessages, addMessageToChannel } from '../../api/httpRequest';
import { Message } from '../../../common/types';
import { usePrevious, setLocalMessages, getLocalMessages } from '../../../common/utils';
import '../../styles/MessagePanel.css';

interface ChannelProps {
  selectedChannel: string;
}

const MessageView = React.lazy(() => import('./Message.component'));

function ChannelMessages(props: ChannelProps): React.ReactElement {
  const { selectedChannel } = props;
  const [channelMessages, setChannelMessages] = useState([] as Message[]);
  const [now, setNow] = useState(new Date());

  const previousChannel = usePrevious(selectedChannel);

  useEffect(() => {
    if (selectedChannel !== '' && selectedChannel !== previousChannel) {
      const localMessages = getLocalMessages(selectedChannel);
      if (localMessages.length) {
        setChannelMessages(localMessages);
      }
      getChannelMessages(selectedChannel).then((messages: Message[]) => {
        setChannelMessages(messages);
        setLocalMessages(selectedChannel, messages);
        setNow(new Date());
      });
    }
  }, [selectedChannel, previousChannel]);

  const addNewMessage = (message: string) => {
    setChannelMessages(
      channelMessages.concat([
        {
          id: null,
          text: message,
          created: new Date(),
          author: 'Root user',
          active: true,
        },
      ])
    );
    setLocalMessages(selectedChannel, channelMessages);
    addMessageToChannel(selectedChannel, message);
    setNow(new Date());
  };

  const shouldShowNotification = () => !selectedChannel || channelMessages.length === 0;

  const getNotificationMessage = () =>
    [`Be the first to enter a message for this channel`, 'Select a Channel from the left panel'][
      Number(!selectedChannel)
    ];
  const generatetNotification = () => <div className="notification center">{getNotificationMessage()}</div>;

  const renderMessage = (message: Message, index: number) => (
    <MessageView key={`msg-${index}`} now={now} message={message} />
  );

  return (
    <div className="messages-container">
      <div className="messages">
        {shouldShowNotification() ? (
          generatetNotification()
        ) : (
          <Suspense fallback={<div>Loading Messages ...</div>}>{[...channelMessages].map(renderMessage)}</Suspense>
        )}
      </div>
      {selectedChannel && (
        <div className="enter-message-container">
          <EnterMessage
            isDisabled={!selectedChannel}
            selectedChannel={selectedChannel}
            addMessage={addNewMessage}
            maxLength={100}
          />
        </div>
      )}
    </div>
  );
}

export default ChannelMessages;
