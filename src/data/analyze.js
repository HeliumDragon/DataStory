const _ = require('lodash')
var fs = require('fs');
let movieBubbleData = {}
const allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));
const uniqueGenres = getUniqueGenres(allMovies)
const goodMovies = allMovies.filter(o => {
  let topRanking = o.info.rank < allMovies.length * 0.15
  let highlyRated = o.info.rating >= 7
  let from90s = o.year >= 1990
  let validData = o.year && o.info.rating && o.info.rank && o.info.plot 
  return topRanking && highlyRated && validData && from90s
})
const goodIndieMovies = allMovies.filter(o => {
  let topTenPercent = o.info.rank < allMovies.length * 0.1
  let highlyRated = o.info.rating > 8
  return highlyRated && !topTenPercent
})

const schema = [
  { name: 'year', index: 0, text: 'year' },
  { name: 'rating', index: 1, text: 'rating' },
  { name: 'running_time_secs', index: 2, text: 'running time' },
  { name: 'rank', index: 3, text: 'rank' },
  { name: 'date', index: 4, text: 'date' },
  { name: 'title', index: 5, text: 'title' },
  { name: 'genres', index: 6, text: 'genres' },
  { name: 'plot', index: 7, text: 'plot' },
  { name: 'image_url', index: 8, text: 'image_url' },
  { name: 'actors', index: 9, text: 'actors' },
  { name: 'directors', index: 10, text: 'directors' },
];
movieBubbleData.drama = transformAsArraryFormattedData(getMoviesByFirstGenre(goodMovies, 'Drama'))
movieBubbleData.action = transformAsArraryFormattedData(getMoviesByFirstGenre(goodMovies, 'Action'))
movieBubbleData.comedy = transformAsArraryFormattedData(getMoviesByFirstGenre(goodMovies, 'Comedy'))
movieBubbleData.adventure = transformAsArraryFormattedData(getMoviesByFirstGenre(goodMovies, 'Adventure'))
movieBubbleData.crime = transformAsArraryFormattedData(getMoviesByFirstGenre(goodMovies, 'Crime'))

const content = `
  export const schema = ${JSON.stringify(schema)}
  export const data = ${JSON.stringify(movieBubbleData)}
`
fs.writeFileSync('movieBubbleData.ts', content, 'utf8');


function transformAsArraryFormattedData(movies) {
  return movies.map(movie => {
    let datum = [movie.year, movie.info.rating, movie.info.running_time_secs, movie.info.rank, movie.info.release_date]
    datum = datum.concat([movie.title, movie.info.genres && movie.info.genres.join(', '), movie.info.plot, movie.info.image_url])
    datum = datum.concat([movie.info.actors && movie.info.actors.join(', '), movie.info.directors && movie.info.directors.join(', ')])
    return datum
  })
}


function getMoviesByGenre(movies, genre) {
  return movies.filter(movie => movie.info.genres && movie.info.genres.includes(genre))
}

function getMoviesByFirstGenre(movies, genre) {
  return _.sortBy(movies.filter(movie => movie.info.genres && movie.info.genres[0] === genre), 'year')
}

function getUniqueGenres(movies) {
  let allGenres = _.pull(_.flatten(movies.map(m => m.info.genres)), undefined)
  return _.uniq(allGenres).sort()
}

function getGenreCount(movies) {
  let genreCount = []
  let allGenres = _.pull(_.flatten(movies.map(m => m.info.genres)), undefined)
  const staObj = _.groupBy(allGenres, (a) => a)
  getUniqueGenres(movies).forEach(g => {
    genreCount.push([g, staObj[g].length])
  })
  return genreCount
}

function getTopGenres(movies, limit = movies.length) {
  return _.take(_.sortBy(getGenreCount(movies), (o) => o[1]).reverse(), limit)
}
let topTenGenres = getTopGenres(allMovies, 10)
let topTenBestGenres = getTopGenres(goodMovies, 10)
let topTenBestIndieGenres = getTopGenres(goodIndieMovies, 10)


// console.log(movieBubbleData)
console.log(getMoviesByGenre(goodMovies, 'Drama').length, getMoviesByFirstGenre(goodMovies, 'Drama').length)
console.log(getMoviesByGenre(goodMovies, 'Action').length, getMoviesByFirstGenre(goodMovies, 'Action').length)
console.log(getMoviesByGenre(goodMovies, 'Comedy').length, getMoviesByFirstGenre(goodMovies, 'Comedy').length)
console.log(getMoviesByGenre(goodMovies, 'Adventure').length, getMoviesByFirstGenre(goodMovies, 'Adventure').length)
console.log(getMoviesByGenre(goodMovies, 'Crime').length, getMoviesByFirstGenre(goodMovies, 'Crime').length)
// console.log(getMoviesByGenre(goodMovies, 'Thriller').length, getMoviesByFirstGenre(goodMovies, 'Thriller').length)
// console.log(getMoviesByGenre(goodMovies, 'Sci-Fi').length, getMoviesByFirstGenre(goodMovies, 'Sci-Fi').length)
// console.log(getMoviesByGenre(goodMovies, 'Fantasy').length, getMoviesByFirstGenre(goodMovies, 'Fantasy').length)
// console.log(getMoviesByGenre(goodMovies, 'Romance').length, getMoviesByFirstGenre(goodMovies, 'Romance').length)
// console.log(getMoviesByGenre(goodMovies, 'Family').length, getMoviesByFirstGenre(goodMovies, 'Family').length)
