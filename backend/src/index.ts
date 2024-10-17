import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import logRoutes from './routes/logRoutes'

dotenv.config()
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(logRoutes)

app.get('/hello-world', (_req: Request, res: Response) => {
  return res.status(200).send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
