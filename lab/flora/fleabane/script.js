(function(){
    'use strict';
    console.log('reading js');

    let gen;
    let angle = 20;
    let angleVar = 7;
    let branches;
    const fleabane = document.querySelector('#fleabane');

    function getVal(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function reset(){
        branches = document.querySelectorAll('#fleabane .gen0');
        while (branches[0].firstChild) {
            branches[0].removeChild(branches[0].firstChild);
        }
        gen = 0;
        growGen();
    }

    function createDiv(className){
        const newElement = document.createElement('div');
        newElement.classList.add(className);
        return(newElement);
    }

    function createImgDiv(className, type, number){
        const newDiv = createDiv(className);
        const newImg = document.createElement('img');
        newImg.src = `../../lab/flora/fleabane/assets/${type}-${number}.png`;
        newImg.onload = function(){newImg.style.height = `${newImg.naturalHeight / 35}em`};
        newDiv.style.animationDelay = `-${Math.round(Math.random() * 200) / 30 + 1 * gen}s`;
        newDiv.appendChild(newImg);
        return(newDiv);
    }

    function genSeg(){
        const newNode = createDiv('node');
        const leaves = getVal (1.2, 2);
        for(let i = 0; i < leaves; i++){
            const newLeafNode = createDiv('node');
            newLeafNode.style.transform = `rotate(${-(i * 2 - 1) * 50 + Math.round(Math.random() * angleVar) - 0.5 * angleVar}deg) scaleX(${i * 2 - 1})`;
            const newLeaf = createImgDiv('leaf', 'leaf', getVal(1, 6));
            newNode.appendChild(newLeafNode).appendChild(newLeaf);
        }
        const segs = getVal (2, 3);
        for(let i = 0; i < segs; i++){
            const newBranchNode = createDiv('node');
            if(segs == 2){
                newBranchNode.style.transform = `rotate(${(i * 2 - 1) * angle + Math.round(Math.random() * angleVar) - 0.5 * angleVar}deg)`;
            }else{
                newBranchNode.style.transform = `rotate(${(i - 1) * angle + Math.round(Math.random() * angleVar) - 0.5 * angleVar}deg)`;
            }

            let imgNum;
            let imgType;

            if(gen > getVal(1,5)){
                imgType = 'flower';
                imgNum = getVal(1,12);
            }else{
                imgType = 'stem';
                if(gen < 2){
                    imgNum = getVal(1,7);
                }else{
                    imgNum = getVal(6,10);
                }
            }
            const newBranch = createImgDiv('segment', imgType, imgNum);
            if(imgType != "flower"){
                newBranch.classList.add(`gen${gen}`);
            }

            newNode.appendChild(newBranchNode).appendChild(newBranch);
        }
        return(newNode);
    }

    function growGen(){
        gen++;

        for(let i = 0; i < branches.length; i++){
            const newBranch = genSeg();
            branches[i].appendChild(newBranch);
        }

        branches = document.querySelectorAll(`#fleabane .gen${gen}`);

        if(branches.length > 0){
            growGen();
        }
    }

    fleabane.addEventListener('mousedown', function(){
        reset();
    });

    window.addEventListener('load', function(){
        reset();
    });
}())