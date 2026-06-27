const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about',(req, res)=>{
    res.send('i am about')
})
app.get('/contact',(req, res)=>{
    res.send('i am contact')
})
app.get('/service',(req, res)=>{
    res.send('service')
})

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})