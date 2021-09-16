import express from 'express'

const app = express()

const PORT = parseInt(process.env.PORT || '5000')

app.get('/ping', (req, res) => res.send('pong'))

app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)
})
