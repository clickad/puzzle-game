$(document).ready(function(){

  function getData() {
    return $.getJSON('data.json');
  }

  $.when(getData()).then(function (data) {

      var folders = data; 
      var index;
      var puzzle = {};
      var allImages = []; 
      var folder;
      var boxes;
      var finalImages = [];
      var wrapperSize;
      var rows = 6;

    function init(){
      finalImages = [];
      index = Math.floor(Math.random()*folders.length);
      puzzle = folders[index];
      allImages = puzzle.puzzle.images;
      folder = puzzle.puzzle.folder;
      boxes = allImages.length;
      $('.wrapper').empty();
      finalImages = shuffle(allImages);
      insertBox();
      wrapperWidth();
    }
    init();

    //sfuffle images
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    
    function insertBox(){
      for(var i = 0; i < finalImages.length; i++){
        $('.wrapper').append('<div class = "box"><img src = "img/' + folder + '/'+ finalImages[i]+'.png" alt = "image"></div>');
      } 
      $( ".box" ).draggable(
        { 
          containment: ".wrapper", 
          scroll: false, 
          stack: ".box" 
        }
      );
    }

    $(window).on('resize',function(){
      $('.wrapper').empty();
      insertBox();
      wrapperWidth();
    });

    function wrapperWidth(){
      wrapperSize = (parseInt($('.box').width()) * parseInt(rows));
      $('.wrapper').css("width",wrapperSize + 4 + "px");
    }
    
    $('.start').on('click', function(){
      init();
    });

  });
})