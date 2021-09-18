import express, { json, urlencoded } from 'express'
import db from 'models'
import service from 'services'

const app = express()

const PORT = parseInt(process.env.PORT || '5000')

app.use(async (req, res, next) => {
  await db.sequelize.authenticate()
  next()
})

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(service)

app.get('/ping', (req, res) => {
  res.sendStatus(200)
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at port ${PORT}`)
})
