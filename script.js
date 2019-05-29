$(document).ready(function () {



  $('.toSearch').keypress(function (enter) {
    var search = '';
    var keyCode = (enter.which);
    if (keyCode == '13') {
      search = $('.toSearch').val();
    }
    callApi(search)
  });

  $('#search_icon').click(function () {
    var search = $('.toSearch').val();
    callApi(search)
  });




  function callApi(toSearch) {
    if (toSearch.length > 0) {
      //ajax film
      $.ajax({
        'url': 'https://api.themoviedb.org/3/search/movie?api_key=dbdd37b88ef4b1fdd0bb521b31a40924&query=toSearch',
        'method': 'GET',
        'data':{
          'query': toSearch
        },
        'success': function (movie) {
          var movieSearched = movieCards(movie.results);
          //console.log(movie.results);
          var template = Handlebars.compile($('#template').html());
          var html;
          for (var field in movieSearched) {
            html = template(movieSearched[field]);
            $('.cards_container').append(html)
          }
        },
        'error': function () {
          alert('errore');
        }
      });

      //ajax serie tv
      $.ajax({
        'url': 'https://api.themoviedb.org/3/search/tv?api_key=dbdd37b88ef4b1fdd0bb521b31a40924&query=toSearch',
        'method': 'GET',
        'data':{
          'query': toSearch
        },
        'success': function (tv) {
          var tvSearched = tvCards(tv.results);
          console.log(tv.results);
          console.log(tvSearched);
          var template = Handlebars.compile($('#template').html());
          var html;
          for (var field in tvSearched) {
            html_tv = template(tvSearched[field]);
            $('.cards_container').append(html)
          }
        },
        'error': function () {
          alert('errore');
        }
      });
    }else {
      clearHTML($('.cards_container'));
    };
  };



  function movieCards(movie) {
    var movies = [];
    for (var i = 0; i < movie.length; i++) {
      var language = movie[i].original_language;
      //cambia i codici dei paesi in modo da risultare uguali tra api ed il css flag-icon
      switch (language) {
        case 'en': language = 'gb';
        break;
        case 'ja': language = 'jp';
        break;
        case 'zh': language = 'cn';
        break;
      };
      movies.push({
        "title": movie[i].title,
        "original_title": movie[i].original_title,
        "vote_average": getStarsVote(movie[i].vote_average),
        "language": '<span class="flag-icon flag-icon-'+language+'"'+'></span>'
      });
    };
    return movies
  };

  function tvCards(serieTv) {
    var serieTv = [];
    for (var i = 0; i < serieTv.length; i++) {
      var language = serieTv[i].original_language;
      //cambia i codici dei paesi in modo da risultare uguali tra api ed il css flag-icon
      switch (language) {
        case 'en': language = 'gb';
        break;
        case 'ja': language = 'jp';
        break;
        case 'zh': language = 'cn';
        break;
      };
      serieTv.push({
        "name": serieTv[i].name,
        "original_name": serieTv[i].original_name,
        "vote_average": getStarsVote(serieTv[i].vote_average),
        "language": '<span class="flag-icon flag-icon-'+language+'"'+'></span>'
      });
    };
    return serieTv
  };

  //funzione che mi disegna le stelline in base al voto
  function getStarsVote(vote) {
    var numStelline = Math.round(vote/2)
    var stars = '';
    //aggiunge le stelline piene
    for (var i = 0; i < 5; i++) {
      if (i < numStelline) {
        //stelline piene
        stars += '<i class="fas fa-star"></i>';
      }else {
        //stelline vuote
        stars += '<i class="far fa-star"></i>';
      }
    }
    return stars
  };


  function clearHTML(toClear){
    toClear.html('')
  };

});
