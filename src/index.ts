import express from 'express'

const app = express()

const PORT = parseInt(process.env.PORT || '5000')

app.get('/ping', (req, res) => res.send('pong'))

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening at port ${PORT}`)
})
