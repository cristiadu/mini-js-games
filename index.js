const express = require("express")
const path = require('path')
const app = express()
const port = process.env.PORT || 4000

process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, 'src')));
app.listen(port, () => console.log(`The server is listening on port ${port}`))
