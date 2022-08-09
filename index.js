const express = require('express')
const app = express();
const cors  = require('cors')
const redis = require('redis');
require('dotenv').config()

const client = redis.createClient({
    socket: {
      host: '127.0.0.1',
      port: '6379'
    }
});
const PORT = process.env.PORT ||3002

// json
app.use(express.json())
// cors
app.use(cors())

app.get('/text',(req,res)=>{
  res.json('Hello world')
})

app.post('/setName',(req, res) => {
  const { key, userName } = req.body
  if (!key || !userName) {
    res.json('key or userName is Empty')
  }
  if (key && userName) {
    client.set(key, userName)
    res.json('sucess add NewUser')
  }
})

app.listen(PORT, async () => {
  await client.connect();
  console.log(`server run on port : ${PORT}`)
})