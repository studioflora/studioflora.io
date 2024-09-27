(function(){
    'use strict';
    console.log('reading bbb js');

    let gen;
    let angle = 20;
    let angleVar = 7;
    let branchSegments = 3;
    let branches;
    let stages = [
        ['01.png','02.png','03.png','04.png','05.png'],
        ['06.png','07.png','08.png','09.png','10.png'],
        ['11.png','12.png','13.png','14.png','15.png','16.png','17.png','18.png','19.png'],
    ];
    let currentStage = 1;
    let newStage;
    let stageCounter;
    const babysbreath = document.querySelector('#babysbreath');

    function reset(){
        branches = document.querySelectorAll(`#babysbreath .gen0`);
        while (branches[0].firstChild) {
            branches[0].removeChild(branches[0].firstChild);
        }
        gen = 0;
        currentStage = 1;
        checkStage();
    }

    function checkStage(){
        branches = document.querySelectorAll(`#babysbreath .gen${gen}`);
        gen++;
        stageCounter = 0;
        for(let i = 0; i < branches.length; i++){
            if(branches[i].className.indexOf("stage1") >= 0){
                currentStage = 1;
                stageCounter++;
                grow(branches[i]);
            }else if(branches[i].className.indexOf("stage2") >= 0){
                currentStage = 2;
                stageCounter++;
                grow(branches[i]);
            }
        }

        if (stageCounter > 0){
            checkStage();
        }
    }

    function grow(currentBranch){
        for(let i = 0; i < branchSegments; i++){
            const newBranchNode = document.createElement('div');
            const newBranch = document.createElement('div');
            const newBranchImg = document.createElement('img');
            newBranch.classList.add(`gen${gen}`);
            newBranch.classList.add('segment');
            newBranchNode.classList.add('node');
            switch (currentStage){
                case 1:
                    if(gen < 2){
                        newStage = Math.round(Math.random() + 1);
                    }else{
                        newStage = 2;
                    }
                    break;
                default:
                    if(gen < 5){
                        newStage = Math.round(Math.random() + 2);
                    }else{
                        newStage = 3;
                    }
                    break;
            }
            newBranch.classList.add(`stage${newStage}`);
            newBranch.style.animationDelay = `-${Math.round(Math.random() * 200) / 30 + 1 * gen}s`;
            newBranchNode.style.transform = `rotate(${(i - 1) * angle + Math.round(Math.random() * angleVar) - 0.5 * angleVar}deg)`;
            newBranchImg.src = `/lab/flora/babysbreath/assets/bb-${stages[newStage - 1][Math.floor(Math.random() * stages[newStage - 1].length)]}`;
            newBranchImg.style.height = '0';
            newBranchImg.onload = function(){
                newBranchImg.style.height = `${newBranchImg.naturalHeight / 13}cqw`;
            };

            currentBranch.appendChild(newBranchNode).appendChild(newBranch).appendChild(newBranchImg);
        }
    }

    babysbreath.addEventListener('mousedown', function(){
        reset();
    });

    window.addEventListener('load', function(){
        reset();
    });
}())