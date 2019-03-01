(()=>{
  "use strict";
  let getData = ()=> { 
    return $.getJSON("../src/data.json");
  }
  $.when(getData()).then((data)=> {
    let app = {
      init: function(){
        this.$window = $(window);
        this.$wrapper = $('.wrapper');
        this.$startBtn = $('.start');
        this.folders = data; 
        this.wrapperSize = 0;
        this.finalImages = [];
        this.rows = 6;
        this.newPuzzle();
        this.$startBtn.on('click', this.newPuzzle.bind(this));
        this.$window.on('resize',this.wrapperSet.bind(this));
      },
      newPuzzle: function (){
        this.index = Math.floor(Math.random()*this.folders.length);
        this.puzzle = this.folders[this.index];
        this.allImages = this.puzzle.puzzle.images;
        this.folder = this.puzzle.puzzle.folder;
        this.boxes = this.allImages.length;
        this.$wrapper.empty();
        this.finalImages = this.shuffle(this.allImages);
        this.insertBox();
        this.wrapperWidth();
      },
      shuffle: function (array) {   //sfuffle images
        let currentIndex = array.length, temporaryValue, randomIndex;
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
      },
      insertBox: function (){
        for(let i = 0; i < this.finalImages.length; i++){
          this.$wrapper.append(
            `<div class = "box">
              <img src = "img/${this.folder}/${this.finalImages[i]}.png" alt = "image">
            </div>`
          );
        } 
        $( ".box" ).draggable(
          { 
            containment: ".wrapper", 
            scroll: false, 
            stack: ".box" 
          }
        );
      },
      wrapperSet: function(){
        this.$wrapper.empty();
        this.insertBox();
        this.wrapperWidth();
      },
      wrapperWidth: function (){
        this.wrapperSize = (parseInt($('.box').width()) * parseInt(this.rows));
        this.$wrapper.css("width",this.wrapperSize + 4 + "px");
      }
    };
    $(document).ready(()=> { 
      app.init();
    });
  });
})();