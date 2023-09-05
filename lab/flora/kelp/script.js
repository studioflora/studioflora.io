(function(){
    'use strict';
    console.log('reading js');

    const kelp = document.querySelector('#kelp');
    const vp = kelp.querySelector('.viewport');
    let vpHeight;
    let vpWidth;
    let stalks;
    let stalkMin;
    let stalkMax;
    let stalkRange;
    let stalkHeight = [];
    let stalkDelay;
    let gens;
    let leafSize;

    // adjustable values
    let leavesPerSeg = 2;
    let density = 0.4;

    function getValue(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function compareNumbers(a, b) {
        return a - b;
    }

    function reset(){
        while (vp.firstChild) {
            vp.removeChild(vp.firstChild);
        }
        vpWidth = vp.offsetWidth;
        vpHeight = vp.offsetHeight;
        console.log(vpWidth);
        stalks = Math.round(vpWidth / 10 * density);
        stalkMin = vpHeight / 8;
        stalkMax = vpHeight / 3;
        stalkRange = stalkMax - stalkMin;
        stalkHeight = [];

        for(let i = 0; i < stalks; i++){
            stalkHeight.push(getValue(stalkMin, stalkMax));
        }
        stalkHeight.sort(compareNumbers);
        grow();
    }

    function grow(){
        for(let i = 0; i < stalks; i++){
            gens = Math.round(vpHeight / stalkHeight[i]) + 4;
            stalkDelay = getValue(0, 20) / 10;
            for(let j = 0; j < gens; j++){
                const newSeg = document.createElement('div');
                newSeg.classList.add('segment', `gen${j}`, `stalk${i}`);
                newSeg.style.width = `${stalkHeight[i] / 10}px`;
                if(j > 0){
                    newSeg.style.height = `${stalkHeight[i]}px`;
                    newSeg.style.background = `hsl(${200 - 70 * (stalkHeight[i] - stalkMin) / stalkRange}, ${70 + 20 * (stalkHeight[i] - stalkMin) / stalkRange}%, ${17 + 10 * (stalkHeight[i] - stalkMin) / stalkRange}%)`;
                    newSeg.style.animationDelay = `${-1.2 * (10 - j) - stalkDelay}s`;
                    for(let k = 0; k < leavesPerSeg; k++){
                        const newLeaf = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        leafSize = getValue(70, 120) / 100;
                        newLeaf.classList.add('leaf');
                        newLeaf.style.height = `${stalkHeight[i] * leafSize / 3}px`;
                        newLeaf.style.width = `${stalkHeight[i] * leafSize}px`;
                        newLeaf.innerHTML = `<use href="/lab/flora/kelp/assets/leaves.svg#leaf${getValue(1, 6)}" fill="hsla(${200 - 70 * (stalkHeight[i] - stalkMin) / stalkRange}, ${60 + 30 * (stalkHeight[i] - stalkMin) / stalkRange}%, ${20 + 10 * (stalkHeight[i] - stalkMin) / stalkRange}%, 0.93)"/>`; 
                        newLeaf.style.bottom = `${stalkHeight[i] / leavesPerSeg * k - getValue(0, stalkHeight[i]) / 15}px`;
                        newLeaf.style.left = `${stalkHeight[i] / 20}px`;
                        newLeaf.style.animationDelay = `${-0.4 * (10 - j) - stalkDelay - 4 + getValue(0, 20) / 10}s`;                   
                        newSeg.appendChild(newLeaf);
                    }
                    vp.querySelector(`.gen${j - 1}.stalk${i}`).appendChild(newSeg);
                } else {
                    newSeg.style.left = `${getValue(-vpWidth / 5, vpWidth * 1.2)}px`;
                    newSeg.style.bottom = `-${getValue(stalkHeight[i] / 5, stalkHeight[i])}px`;
                    newSeg.style.animationDelay = `${-2 - stalkDelay}s`;
                    vp.appendChild(newSeg);
                }
            }
        }
    }

    window.addEventListener('load', (event) => {
        reset();
    });

    vp.addEventListener('click', reset);

    window.addEventListener('resize', function(){
        setTimeout(reset, 500);
    });
}())