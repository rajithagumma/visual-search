const express = require('express')
const next = require('next')
const lti = require('ltijs').Provider

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Setup LTI
lti.setup(
  'LTIKEY123',
  { url: 'mongodb://localhost:27017/ltijs' },
  {
    appRoute: '/',
    loginRoute: '/login',
    dynRegRoute: '/register',
    devMode: true,
    cookies: {
      secure: false,
      sameSite: ''
    },
    dynReg: {
      url: 'http://localhost:3000',
      name: 'My Visual Search Tool',
      description: 'Test LTI Tool for Visual Search',
      autoActivate: true
    }
  }
)

// Correct LTI launch handler
lti.onConnect((token, req, res) => {
  return res.redirect('/')
})

const startServer = async () => {
  await app.prepare()
  const server = express()

  server.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`)
    next()
  })

  await lti.deploy({ serverless: true, expressApp: server })

  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Express + LTI!' })
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`)
  })
}

startServer()
