const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()





const controllerFile = require('./controller')



app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})


app.get(`/api/movies`, controllerFile.getMovies)
app.post(`/api/movies`, controllerFile.createMovie)
app.delete(`/api/movies/:id`, controllerFile.deleteMovie)
app.put(`/api/movies/:id`, controllerFile.updateMovie);


const port = process.env.PORT || 4004
app.listen(port, () => console.log(`running on 4004`))

