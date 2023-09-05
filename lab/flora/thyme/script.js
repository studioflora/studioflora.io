(function(){
    'use strict';
    console.log('reading js');

    let leaves = 8;
    let stems = 4;
    let minBranches = 3;
    let maxBranches = 7;
    let maxGens = 10;
    let minGens = 6;
    let directory = '/lab/flora/thyme/assets';

    let gens;
    let branchAngles;

    const thyme = document.querySelector('#thyme');
    const thymePlanter = document.querySelector('#thyme .planter');

    function getValue(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function seed(){
        // preloadImgs();
        branchAngles = [];
        while (thymePlanter.firstChild) {
            thymePlanter.removeChild(thymePlanter.firstChild);
        }
        for(let i = 0; i < getValue(minBranches, maxBranches); i++){
            const newBranchNode = document.createElement('div');
            const newBranchPosition = getValue(0, 100);
            newBranchNode.classList.add('node', 'gen0', `branch${i}`);
            newBranchNode.style.left = `${newBranchPosition}%`;
            const branchAngle = (50 - newBranchPosition) / -1.5;
            newBranchNode.style.transform = `rotate(${branchAngle}deg)`;
            branchAngles.push(branchAngle);
            thymePlanter.appendChild(newBranchNode);
        }
        growBranches();
    }

    function growBranches(){
        for(let i = 0; i < branchAngles.length; i++){
            gens = getValue(minGens, maxGens);
            for(let j = 0; j < gens; j++){

                const newBranch = document.createElement('div');
                const newBranchImg = document.createElement('img');
                newBranchImg.src = `${directory}/stem-${getValue(1, stems)}.png`;
                newBranchImg.onload = function(){newBranchImg.style.height = `${newBranchImg.naturalHeight / 100}em`}
                const newBranchNode = document.createElement('div');
                newBranchNode.style.transform = `rotate(${branchAngles[i] / (-j * 2.25)}deg)`
                newBranchNode.classList.add('node', `gen${j + 1}`, `branch${i}`);
                newBranch.classList.add('stem', `gen${j + 1}`, `branch${i}`);
                for(let k = 0; k < 2; k++){
                    const newLeaf = document.createElement('img');
                    newLeaf.src = `${directory}/leaf-${getValue(1, leaves)}.png`;
                    newLeaf.classList.add('leaf');
                    newLeaf.onload = function(){newLeaf.style.height = `${newLeaf.naturalHeight / 100}em`};
                    newLeaf.style.animationDelay = `-${getValue(0, 1000)}ms`;
                    newBranchNode.appendChild(newLeaf);
                }
                newBranch.appendChild(newBranchImg);
                newBranch.style.animationDelay = `-${getValue(0, 1000)}ms`;
                thymePlanter.querySelector(`.node.gen${j}.branch${i}`).appendChild(newBranch).appendChild(newBranchNode);
            }
            thymePlanter.querySelector(`.branch${i}.gen${gens} .leaf`).remove();
            thymePlanter.querySelector(`.node.branch${i}.gen${gens}`).style.transform = 'rotate(30deg)';
        }
    }

    thyme.addEventListener('mousedown', function(){
        seed();
    })

    window.addEventListener('load', function(){
        seed();
    });
}())