/**
 * Minimal Express server for local development: serves the static game files
 * under ./src on PORT (default 4000). Production hosting is GitHub Pages.
 */
import express from 'express'
import path from 'path'

const app = express()
const port = process.env.PORT || 4000

app.use(express.static(path.join(process.cwd(), 'src')))
app.listen(port, () => console.log(`The server is listening on port ${port}`))
