import _ from 'lodash';
import './css/style.css';
import Images from './js/data.js';
import Create from './js/create.js';

(()=>{
  "use strict";
  $(window).on("load", ()=> {
    let data = new Images();

    $.when(data.getData()).then((data)=> {
      let create = new Create(data);
      create.newPuzzle();
      create.$startBtn.on('click', ()=>create.newPuzzle());
      create.$window.on('resize',()=>create.wrapperSet());
    });
  });
})();
