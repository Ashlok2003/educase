import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import yaml from 'js-yaml'
import fs from 'fs'
import schoolRoutes from './routes/schoolRoutes'
import { initDb } from './services/dbService'
import path from 'path'

dotenv.config()

const app = express()
app.use(express.json())

initDb()

const swaggerPath = path.resolve(__dirname, '../docs/swagger.yaml')
const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, 'utf8')) as Record<string, any>

app.use('/api', schoolRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`)
})

export default app
