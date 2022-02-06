'use strict'

import { Message } from '../../common/types'
import { getNewId } from '../../common/utils'

const Messages: Record<string, Array<Message>> = {}

const generateMessageData = (id: number, msg: string): Message => ({
  id,
  text: msg,
  created: new Date(),
  author: 'Root User',
  active: true,
})

export function addNewMessage(channelId: string, message: string): Promise<void> {
  const channelMessages = Messages[channelId] || []
  const newId = getNewId([...channelMessages])
  Messages[channelId] = channelMessages.concat([generateMessageData(newId, message)])
  return Promise.resolve()
}

export function getMessages(channelId: string): Promise<Array<Message>> {
  const channelMessages = Messages[channelId] || []
  return Promise.resolve(channelMessages.filter((msg: Message) => msg.active))
}
