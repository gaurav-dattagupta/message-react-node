import { Request, Response, Router } from 'express'
import { MessageChannels } from '../models/channels'

const router = Router()

router.get('/', (_: Request, response: Response) => response.status(200).send(MessageChannels).end())

export default router
