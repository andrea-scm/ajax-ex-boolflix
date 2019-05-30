$(document).ready(function () {

  $('.toSearch').keypress(function (enter) {
    var search = '';
    var keyCode = (enter.which);
    if (keyCode == '13') {
      search = $('.toSearch').val();
      //se ho selezionato film verrano visualizzati solo i Film
      //altrimenti se ho selezionato serie tv verranno visualizzati solo le serie tv
      if ($(".film").hasClass('border')) {
        callApiMovie(search)
        clearHTML($('.cards_container'));
        $('.toSearch').val('');
      }else if ($(".serie_tv").hasClass('border')) {
        $('.toSearch').val('');
        clearHTML($('.cards_container'));
        callApiTv(search)
      }
    }
  });

  $('#search_icon').click(function () {
    var search = $('.toSearch').val();
    //se ho selezionato film verrano visualizzati solo i Film
    //altrimenti se ho selezionato serie tv verranno visualizzati solo le serie tv
    if ($(".film").hasClass('border')) {
      callApiMovie(search)
      clearHTML($('.cards_container'));
      $('.toSearch').val('');
    }else if ($(".serie_tv").hasClass('border')) {
      $('.toSearch').val('');
      clearHTML($('.cards_container'));
      callApiTv(search)
    }
  });

  //assegno il bordo all'elemento selezionato del menu (film/serie tv)
  //e in base a quello selezionato cambio il testo del placeholder
  //in modo da ricercare solo film o solo serie tv
  $('ul').on('click','li',function(){
    $('li.border').removeClass('border');
    $(this).addClass('border');

    if ($('.serie_tv').hasClass('border')) {
      $('.toSearch').attr("placeholder", "Cerca una serie TV");
    }else {
      $('.toSearch').attr("placeholder", "Cerca un film");
    }
  });


  $(document).on('mouseenter mouseleave', '.cards',function () {
    $(this).children('.poster').toggleClass('disable')
    $(this).children('.info').toggleClass('active')
  });

  //api per visualizzare i film
  function callApiMovie(toSearch) {
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
          //console.log(movieSearched); //levare dai commenti se si vuole verificare il console che si tratta solo di film
          console.log(movie);
          drawCards(movieSearched)
        },
        'error': function () {
          alert('errore');
        }
      });
    }
  };

  //api per visualizzare le serie tv
  function callApiTv(toSearch) {
    if (toSearch.length > 0) {
      //ajax serie tv
      $.ajax({
        'url': 'https://api.themoviedb.org/3/search/tv?api_key=dbdd37b88ef4b1fdd0bb521b31a40924&query=toSearch',
        'method': 'GET',
        'data':{
          'query': toSearch
        },
        'success': function (serieTv) {
          var tvSearched = tvCards(serieTv.results);
          //console.log(tvSearched); //levare dai commenti se si vuole verificare il console che si tratta solo di serie tv
          drawCards(tvSearched)
        },
        'error': function () {
          alert('errore');
        }
      });
    }
  };

  //api che mi rappresenta gli elementi su handlebars
  function drawCards(card) {
    var template = Handlebars.compile($('#template').html());
    var html;
    for (var field in card) {
      html = template(card[field]);
      $('.cards_container').append(html)
    }
  }

  //caratteristiche card film
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
        "poster": '<img class = "poster" src="https://image.tmdb.org/t/p/w342/'+movie[i].poster_path+'"'+'>',
        "type": 'Film',
        "title": movie[i].title,
        "original_title": movie[i].original_title,
        "vote_average": getStarsVote(movie[i].vote_average),
        "language": '<span class="flag-icon flag-icon-'+language+'"'+'></span>',
        "overview": movie[i].overview,
      });
      if (!(movie[i].overview.length > 0)) {
        movie[i].overview = "Not available"
      }
    };
    return movies
  };

  //caratteristiche card serie tv
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
        "poster": '<img class = "poster" src="https://image.tmdb.org/t/p/w342/'+tv[i].poster_path+'"'+'>',
        "type": 'Serie Tv',
        "title": tv[i].name,
        "original_title": tv[i].original_name,
        "vote_average": getStarsVote(tv[i].vote_average),
        "language": '<span class="flag-icon flag-icon-'+language+'"'+'></span>',
        "overview": tv[i].overview
      });
      if (!(serieTv[i].overview.length > 0)) {
        serieTv[i].overview = "Not available"
      }
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
