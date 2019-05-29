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
          console.log('film');
          console.log(movieSearched);
          console.log('film');
          //console.log(movie.results);
          drawCards(movieSearched)
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
        'success': function (serieTv) {
          var tvSearched = tvCards(serieTv.results);
          console.log(serieTv.results);
          console.log(tvSearched);
          console.log(serieTv);
          drawCards(tvSearched)
        },
        'error': function () {
          alert('errore');
        }
      });
    }else {
      clearHTML($('.cards_container'));
    };
  };


  function drawCards(card) {
    var template = Handlebars.compile($('#template').html());
    var html;
    for (var field in card) {
      html = template(card[field]);
      $('.cards_container').append(html)
    }
  }


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
        "type": 'Film',
        "title": movie[i].title,
        "original_title": movie[i].original_title,
        "vote_average": getStarsVote(movie[i].vote_average),
        "language": '<span class="flag-icon flag-icon-'+language+'"'+'></span>'
      });
    };
    return movies
  };

  function tvCards(tv) {
    var serieTv = [];
    for (var i = 0; i < tv.length; i++) {
      var language = tv[i].original_language;
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
        "type": 'Serie Tv',
        "title": tv[i].name,
        "original_title": tv[i].original_name,
        "vote_average": getStarsVote(tv[i].vote_average),
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
