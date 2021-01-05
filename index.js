const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')

const authRoutes = require('./routes/auth')
const linkRoutes = require('./routes/link')
const redirectRoutes = require('./routes/redirect')

const app = express()


app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/links', linkRoutes)
app.use('/t', redirectRoutes)

if (process.env.NODE_ENV === 'production') {
  console.log('point 1')
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    console.log('point 2')
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}


async function start() {
  try {
    await mongoose.connect(config.get('DB_URL'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

start().then(() => app.listen(config.get('PORT'),
  () => console.log(`Server has been started on port ${config.get('PORT')}...`)))
