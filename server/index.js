var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
var axios = require('axios');
var movieModel = require('./models/movieModel.js');
const sqlDb = require('../db/sql');

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup

//Helpers
// var apiHelpers = require("./helpers/apiHelpers.js");

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + "/../client/dist"));

//***********************************************************************************************************************

/*
Use the routes below to build your application:

|      URL         | HTTP Verb |  Result                                                     |
| :------------:   | :-------: |------------------------------------------------------:      |
|     /genres      |   GET     |  Respond with JSON of all genres                            |
|     /search      |   GET     |  Respond with JSON of all movies by the selected genre      |
|     /save        |   POST    |  Save selected movie as favorite                            |
|     /delete      |   POST    |  Remove selected movie as favorite                          |

*/

//TODO: Pick one of the two route options below:
//OPTION 1: Use regular routes, where endpoints are pre-defined on this page, you do NOT need to refer to /server/routes/movieRoutes.js file
//OPTION 2: Use Express Router, where the routes are defined under /server/routes/movieRoutes.js file

//***********************************************************************************************************************
//OPTION 1: Use regular routes;
//If you are using OPTION 1, you do not need routes>movieRoutes.js file

app.get("/genres", function(req, res) {
  // make an axios request to get the official list of genres from themoviedb
  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
  //https://api.themoviedb.org/3/genre/movie/list?api_key=793af5fc61e67616677dadd5026b44be&language=en-US

  // axios.get(https://api.themoviedb.org/3/genre/movie/list?api_key=793af5fc61e67616677dadd5026b44be&language=en-US)
  // // .then((info) => {
  //   console.log(info);
  // })
  var config = {
    method: 'get',
    url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=793af5fc61e67616677dadd5026b44be&language=en-US',
    headers: {
      'Content-Type': 'application/json'
    },
    data : ''
  };
  axios(config)
  .then(function (response) {
    res.send(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
});

app.get("/search", function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  // and sort them by votes (worst first) using the search parameters in themoviedb API
  // do NOT save the results into the database; render results directly on the page

  //first get all the movies using a axios request
  //store those movies is an array.
  //sort those movies based on rating.
  //send those movies back

  var search = req.body.genre;

  var config = {
    method: 'get',
    url: 'https://api.themoviedb.org/3/discover/movie?api_key=793af5fc61e67616677dadd5026b44be&language=en-'
    + `US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&with_genres=${search}&with_watch_`
    + 'monetization_types=flatrate',
    headers: {
      'Content-Type': 'application/json'
    },
    data : ''
  };

  axios(config)
  .then(function (response) {
    // console.log('responseeee', response.data.results);
    res.send(JSON.stringify(response.data.results));
  })
  .catch(function(error) {
    console.log(error);
  });
});

app.post("/save", function(req, res) {
  //save movie as favorite into the database

  //req.body should have userId and which movie to save...
  //connect to database
  //add movie id to database
  //add movie name to database
  //movies should have movieId

  // example movie data!!!
  // {
  //   adult: false,
  //   backdrop_path: null,
  //   genre_ids: [ 36, 10752, 99 ],
  //   id: 832566,
  //   original_language: 'fr',
  //   original_title: 'Baby Cages',
  //   overview: '',
  //   popularity: 0,
  //   poster_path: '/v4H4NCk6VQD04d7ZShQooc5Ephm.jpg',
  //   release_date: '2021-02-23',
  //   title: 'Baby Cages',
  //   video: false,
  //   vote_average: 0,
  //   vote_count: 0
  // }

  var movie = [req.body.id, req.body.title];

  console.log('********************** this is a movie!!! from the request', movie);

  movieModel.saveMovie(movie, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});

app.post("/delete", function(req, res) {
  //remove movie from favorites into the database
  var movie = [req.body.id];
  movieModel.deleteMovie(movie, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3000, function() {
  console.log("listening on port 3000!");
});
//http://localhost:3000/genres