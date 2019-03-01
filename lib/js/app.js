"use strict";

(function () {
  "use strict";

  var getData = function getData() {
    return $.getJSON("../src/data.json");
  };

  $.when(getData()).then(function (data) {
    var app = {
      init: function init() {
        this.$window = $(window);
        this.$wrapper = $('.wrapper');
        this.$startBtn = $('.start');
        this.folders = data;
        this.wrapperSize = 0;
        this.finalImages = [];
        this.rows = 6;
        this.newPuzzle();
        this.$startBtn.on('click', this.newPuzzle.bind(this));
        this.$window.on('resize', this.wrapperSet.bind(this));
      },
      newPuzzle: function newPuzzle() {
        this.index = Math.floor(Math.random() * this.folders.length);
        this.puzzle = this.folders[this.index];
        this.allImages = this.puzzle.puzzle.images;
        this.folder = this.puzzle.puzzle.folder;
        this.boxes = this.allImages.length;
        this.$wrapper.empty();
        this.finalImages = this.shuffle(this.allImages);
        this.insertBox();
        this.wrapperWidth();
      },
      shuffle: function shuffle(array) {
        //sfuffle images
        var currentIndex = array.length,
            temporaryValue,
            randomIndex; // While there remain elements to shuffle...

        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1; // And swap it with the current element.

          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      },
      insertBox: function insertBox() {
        for (var i = 0; i < this.finalImages.length; i++) {
          this.$wrapper.append("<div class = \"box\">\n              <img src = \"img/".concat(this.folder, "/").concat(this.finalImages[i], ".png\" alt = \"image\">\n            </div>"));
        }

        $(".box").draggable({
          containment: ".wrapper",
          scroll: false,
          stack: ".box"
        });
      },
      wrapperSet: function wrapperSet() {
        this.$wrapper.empty();
        this.insertBox();
        this.wrapperWidth();
      },
      wrapperWidth: function wrapperWidth() {
        this.wrapperSize = parseInt($('.box').width()) * parseInt(this.rows);
        this.$wrapper.css("width", this.wrapperSize + 4 + "px");
      }
    };
    $(document).ready(function () {
      app.init();
    });
  });
})();