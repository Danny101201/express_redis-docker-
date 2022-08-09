const express = require('express')
const app = express();
const cors = require('cors')
const redis = require('redis');
require('dotenv').config()

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

// json
app.use(express.json())
// cors
app.use(cors())

app.get('/text', async (req, res) => {
  return res.json('Hello world')
})

app.post('/setName', async (req, res) => {
  const { key, userName } = req.body
  if (!key || !userName) {
    return res.json('key or userName is Empty')
  }
  client.set(key, userName)
  return res.json('sucess add NewUser')
})

app.listen(process.env.PORT || 3001, async () => {
  await client.connect();
  console.log(`server run on port : ${process.env.PORT || 3001}`)
})