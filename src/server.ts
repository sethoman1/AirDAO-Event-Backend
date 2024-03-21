import http from 'http'
import { config } from 'dotenv'
config()

import app from './app'
import { connectDB } from './libs/mongoose'

const server = http.createServer(app)
const PORT = process.env.PORT || 8000;

(async function () {
  server.listen(PORT, async () => {
    await connectDB()
    console.log(`Server is listening on PORT ${PORT}...`)
  })
}())
