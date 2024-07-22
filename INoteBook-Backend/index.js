const connectToMongoos=require("./Db");
const express = require('express')
const cors = require('cors')

connectToMongoos();

const app = express()
const port = 5000 || 5001

app.use(cors())
app.use(express.json())

// Available Routes

app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))


app.listen(port, () => {
  console.log(`INoteBook Backend listening on port http://localhost:${port}`)
})