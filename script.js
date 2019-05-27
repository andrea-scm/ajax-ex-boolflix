$(document).ready(function () {



  $('.movie_name').keypress(function (enter) {
    var movie_to_search = '';
    var keyCode = (enter.which);
    if (keyCode == '13') {
      movie_to_search = $('.movie_name').val();
    }
    callApi(movie_to_search)
    clearHTML()
  });

  $('#search_icon').click(function () {
    var movie_to_search = $('.movie_name').val();
    callApi(movie_to_search)
    clearHTML()
  });




  function callApi(movieToSearch) {
    if (movieToSearch.length > 0) {
      $.ajax({
        'url': 'https://api.themoviedb.org/3/search/movie?api_key=dbdd37b88ef4b1fdd0bb521b31a40924&query=movieToSearch',
        'method': 'GET',
        'data':{
          'query': movieToSearch
        },
        'success': function (movie) {
          var movieSearched = movieCards(movie.results);
          var template = Handlebars.compile($('#template').html());
          var html;
          for (var field in movieSearched) {
            html = template(movieSearched[field]);
            $('.movie_cards_container').append(html)
          }
        },
        'error': function () {
          alert('errore');
        }
      });
    };
  };


  function movieCards(movie) {
    var movies = [];
    for (var i = 0; i < movie.length; i++) {
      movies.push({
        "title": movie[i].title,
        "original_title": movie[i].original_title,
        "vote_average": movie[i].vote_average,
        "language": movie[i].original_language.toUpperCase()
      });
    }
    return movies
  };

  function clearHTML(){
    $('.movie_cards_container').html('')
  };

});
