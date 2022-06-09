const movies = require('./db.json')

let globalId = 11

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '60f40d105bd1447dbb914fee33a0770f',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


module.exports = {
    getMovies: (req, res)=>{
        res.status(200).send(movies)
    },
     deleteMovie: (req, res) => {
        let index = movies.findIndex(elem => elem.id === +req.params.id)
        movies.splice(index, 1)
        res.status(200).send(movies)
    },
    createMovie: (req, res) => {
        let {title , rating, imageUrl} = req.body

        let newMovie = {
            id: globalId,
            title,
            rating: rating,
            // when key and value have same name can just type name and it will be the same as ^
            imageUrl: imageUrl
        }
     movies.push(newMovie)
     globalId++
     // ^^^^ equal to globalID = globalID + 1, think for loops
     res.status(200).send(movies)
    },
    updateMovie: (req, res) => {
        let id = req.params.id;
        let type = req.body.type;

        let index = movies.findIndex((elem) => +elem.id === +id);

        if (movies[index].rating === 5 && type === "plus") {
            res.status(400).send("cannot set a rating above 5");
        } else if ((movies[index].rating === 0) & (type === "minus")) {
            res.status(400).send("cannot set a rating below 0");
        } else if (type === "plus") {
            movies[index].rating++;
            res.status(200).send(movies);
        } else if (type === "minus") {
            movies[index].rating--;
            res.status(200).send(movies);
        } else {
            res.sendStatus(400);
        }
    },
    }