const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')

const authRoutes = require('./routes/auth')
const linkRoutes = require('./routes/link')
const redirectRoutes = require('./routes/redirect')

const app = express()
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : config.get('PORT') || 5000


app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/links', linkRoutes)
app.use('/t', redirectRoutes)

console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'production')
if (process.env.NODE_ENV === 'production') {
  console.log('started')
  app.use('/', express.static(path.join(__dirname, 'client', 'public')))

  app.get('*', (req, res) => {
    console.log('fetched')
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
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
