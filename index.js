const express = require("express")
const path = require('path')
const app = express()
const port = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, './src')))
app.listen(port, () => console.log(`The server is listening on port ${port}`))
