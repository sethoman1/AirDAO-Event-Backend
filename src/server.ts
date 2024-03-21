import http from 'http'
import { config } from 'dotenv'

import { connectDB } from './libs/mongoose'
import app from './app'

config()

const server = http.createServer(app)
const PORT = process.env.PORT || 8000;

(async function () {
  server.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is listening on PORT ${PORT}...`)
  })
}())
