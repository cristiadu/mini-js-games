const express = require("express")
const app = express()
const port = process.env.PORT || 4000

app.use(express.static('src'))
app.listen(port, () => console.log(`The server is listening on port ${port}`))
