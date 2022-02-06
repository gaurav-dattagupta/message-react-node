import React, { Suspense, useEffect, useState } from 'react';
import '../../styles/MessageApp.css';
import { getChannels } from '../../api/httpRequest';
import { Channel } from '../../../common/types';

const Channels = React.lazy(() => import('../navigation/Channels.component'));
const ChannelMessages = React.lazy(() => import('../messages/ChannelMessages.component'));

function MessageApp(): React.ReactElement {
  const [channels, setChannels] = useState([] as Channel[]);
  const [selectedChannel, setSelectedChannel] = useState('');

  const selectChannel = (channelKey: string) => (_: React.MouseEvent) => {
    setSelectedChannel(channelKey);
  };

  useEffect(() => {
    getChannels().then((allChannels: Channel[]) => {
      setChannels(allChannels);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">Message App</header>
      <div className="App-content">
        <section className="channels-section left">
          <Suspense fallback={<div>Loading Channel Panel...</div>}>
            <Channels
              messageChannels={channels || []}
              currentChannel={selectedChannel}
              onSelectChannel={selectChannel}
            />
          </Suspense>
        </section>
        <section className="messages-section right">
          <Suspense fallback={<div>Loading Message Panel...</div>}>
            <ChannelMessages selectedChannel={selectedChannel} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

export default MessageApp;
