import React from 'react';
import { Channel } from '../../../common/types';
import '../../styles/Channels.css';

interface ChannelProps {
  onSelect: (key: string) => (e: React.MouseEvent) => void;
  details: Channel;
  selected: boolean;
}

function ChannelView(props: ChannelProps): React.ReactElement {
  const { onSelect, details, selected } = props;
  return (
    <div className={`message-channel${selected ? ' selected' : ''}`} onClick={onSelect(details.id)}>
      {details.name}
    </div>
  );
}

export default ChannelView;
