import React, { Suspense } from 'react';
import { Channel } from '../../../common/types';
import '../../styles/Channels.css';

interface ChannelProps {
  onSelectChannel: (key: string) => (e: React.MouseEvent) => void;
  messageChannels: Channel[];
  currentChannel: string;
}

const ChannelView = React.lazy(() => import('./Channel.component'));

function Channels(props: ChannelProps): React.ReactElement {
  const { onSelectChannel, messageChannels, currentChannel } = props;

  const renderChannel = (channel: Channel) => (
    <ChannelView
      key={channel.id}
      details={channel}
      selected={channel.id === currentChannel}
      onSelect={onSelectChannel}
    />
  );
  return (
    <div className="channels-nav-container">
      <Suspense fallback={<div>Loading Channels ....</div>}>{messageChannels.map(renderChannel)}</Suspense>
    </div>
  );
}

export default Channels;
