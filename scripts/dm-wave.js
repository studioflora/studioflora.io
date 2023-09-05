(function(){
    'use strict';
    console.log('reading js');

    let display = document.querySelector('.dmw-display');
    let displayMatrix = [];
    
    const artboard = [
          "0000000000000000011111111",
          "0000000000000001111111111",
          "0000000000000011100000000",
          "0000000000000011000000000",
          "0000011111111111111110000",
          "0000111111111111111110000",
          "0000110000000011000000000",
          "0000111111000011000000000",
          "0000011111100011000000000",
          "0000000001110011000000000",
          "0000000000110011000000000",
          "0000000001110011000000000",
          "1111111111100011000000000",
          "1111111111000011000000000"
    ];

    function createDiv(className){
        let newDiv = document.createElement('div');
        newDiv.classList.add(className);
        return newDiv;
    }

    function buildDisplay(){
          for(let i = 0; i < artboard[0].length; i++){
               let newCol = createDiv('dm-col');
               for(let j = 0; j < artboard.length; j++){
                    let cell = createDiv('dm-cell');
                    cell.style.animationDelay=`-${j * 50 + (artboard[0].length - i) * 50}ms`;
                    let dot = createDiv('dm-dot');
                    dot.style.animationDelay=`-${(artboard[0].length - i) * 30 + j * 30 + 700}ms`;
                    newCol.appendChild(cell).appendChild(dot);
               }
               display.appendChild(newCol);
          }

          for(let i = 0; i < artboard[0].length; i++){
               displayMatrix.push(document.querySelectorAll(`.dmw-display .dm-col:nth-of-type(${i + 1}) .dm-dot`));
          }

          for(let i = 0; i < displayMatrix.length; i++){
               for(let j = 0; j < displayMatrix[0].length; j++){
                    displayMatrix[i][j].classList.remove('active');
               }
          }

          for(let i = 0; i < artboard.length; i++){
               for(let j = 0; j < artboard[0].length; j++){
                    if(artboard[i][j] == 1){
                    displayMatrix[j][i].classList.add('active');
                    }
               }
          }
     }

     buildDisplay();
}());