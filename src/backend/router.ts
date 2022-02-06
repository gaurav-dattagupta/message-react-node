import { Router, Request, Response } from 'express'
import MessageChannels from './controllers/MessageChannels.controller'
import Messages from './controllers/Messages.controller'
import { addNewMessage } from './models/messages'

export const router = Router()

router.use('/channels', MessageChannels)
router.use('/messages', Messages)

router.post('/:channelId', (request: Request, response: Response) => {
  const channelId = request.params['channelId'] || ''
  const { message } = request.body
  if (!channelId || typeof message == undefined) {
    return response.status(415).send(new Error('Missing mandatory input'))
  }
  return addNewMessage(channelId, message)
    .then(() => response.status(200).send({}).end())
    .catch((_: Error) => response.status(500).send(new Error('Internal Server Error')).end())
})
