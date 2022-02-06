import { Response, Request, Router } from 'express'
import { getMessages } from '../models/messages'
import { Message } from '../../common/types'
const router = Router()

router.get('/:channelId', (request: Request, response: Response) => {
  const channelId = request.params['channelId'] || ''
  if (!channelId) {
    return response.status(414).send(new Error('Missing Mandatory Input')).end()
  }
  getMessages(channelId)
    .then((messages: Message[]) => response.status(200).send(messages).end())
    .catch((_) => response.status(500).send(new Error('Internal Server Error')).end())
})

export default router
