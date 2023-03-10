const express = require('express')
const routes = require('./routes/routes')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(routes)


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
