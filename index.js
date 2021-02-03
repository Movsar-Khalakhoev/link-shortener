const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')

const authRoutes = require('./routes/auth')
const linkRoutes = require('./routes/link')
const redirectRoutes = require('./routes/redirect')

const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/links', linkRoutes)
app.use('/t', redirectRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
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

start().then(() => app.listen(PORT,
  () => console.log(`Server has been started on port ${config.get('PORT')}...`)))
