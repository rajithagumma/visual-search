const express= require('express')
const next=require('next')
const port=process.env.PORT || 3000
const dev=process.env.NODE_ENV!=='production'
const app=next({dev})
const handle=app.getRequestHandler()
app.prepare().then(()=>{
    const server=express()
    server.get('/api/hello',(req,res)=>{
        res.json({message: 'Hello from Express+Node.js!'})
    })
    server.all('*',(req,res)=>{
    return handle(req,res)
    })
    server.listen(port,()=>{
        console.log(`>Server running at http://localhost:${port}`)
    })
})
