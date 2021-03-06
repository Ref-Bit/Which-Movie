$(document).ready(()=>{
  $('#searchForm').on('submit', (e)=>{
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('http://www.omdbapi.com/?apikey=393562c0&s='+searchText)
  .then((res)=>{
    console.log(res);
    let movies = res.data.Search;
    let output = '';
    $.each(movies, (index, movie)=>{
      output += `
        <div class="col-md-3 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <img src="${movie.Poster}" class="card-img-top">
              <h5 class="card-title mt-3">${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary mt-3" href="#">Movie Details</a>
            </div>
          </div>
        </div>
      `;
    });
    $('#movies').html(output);
  })
  .catch((err)=>{
    console.log(err);
  })
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get(' http://www.omdbapi.com/?apikey=393562c0&i='+movieId)
  .then((res)=>{
    console.log(res);
    let movie = res.data;
    let output = `
      <div class="row">
        <div class="col-md-4 p-0">
          <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8 p-0">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
        </div>
        <div class="col-md-12 card mt-3 p-2">
          <div class="card-body">
            <h3 class="card-title">Plot</h3>
            <p class="card-text">${movie.Plot}</p>
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View on IMDB</a>
            <a href="index.html" class="btn btn-light">Go Back To Search</a>
          </div>
        </div>
      </div>
    `;
    $('#movie').html(output);

  })
  .catch((err)=>{
    console.log(err);
  })
}