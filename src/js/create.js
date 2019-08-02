export default class Create{
  constructor(data){
    this.$window = $(window);
    this.$wrapper = $('.wrapper');
    this.$startBtn = $('.start');
    this.folders = data; 
    this.wrapperSize = 0;
    this.finalImages = [];
    this.rows = 6;
  }
  newPuzzle (){
    this.index = Math.floor(Math.random()*this.folders.length);
    this.puzzle = this.folders[this.index];
    this.allImages = this.puzzle.puzzle.images;
    this.folder = this.puzzle.puzzle.folder;
    this.boxes = this.allImages.length;
    this.$wrapper.empty();
    this.finalImages = this.shuffle(this.allImages);
    this.insertBox();
    this.wrapperWidth();
  }
  shuffle(images) {   //sfuffle images
    let currentIndex = images.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = images[currentIndex];
      images[currentIndex] = images[randomIndex];
      images[randomIndex] = temporaryValue;
    }
    return images;
  }
  insertBox() {
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
  }
  wrapperSet() {
    this.$wrapper.empty();
    this.insertBox();
    this.wrapperWidth();
  }
  wrapperWidth() {
    this.wrapperSize = (parseInt($('.box').width()) * parseInt(this.rows));
    this.$wrapper.css("width",this.wrapperSize + 4 + "px");
  }
}