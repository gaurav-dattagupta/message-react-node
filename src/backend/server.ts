import express from 'express'
import { router } from './router'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', router)

const port = 3002

app.listen(process.env['PORT'] || 3002, () => console.log(`message-app-api server started at http://localhost:${port}`))

export {}
