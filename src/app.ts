import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

import appRouter from './routes'
import error from './middlewares/error.middleware'

const app = express()



app.use(express.json())
app.use(morgan('combined'))
app.use(cors({ origin: '*' }))
app.use(helmet())

app.use('/api', appRouter)

app.use(error)

export default app