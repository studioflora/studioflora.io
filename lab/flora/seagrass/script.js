(function(){
    'use strict';
    console.log('reading js');

    const seagrass = document.querySelector('#seagrass');
    const vp = seagrass.querySelector('.viewport');
    let vpHeight;
    let vpWidth;
    let stalks;
    let stalkMin;
    let stalkMax;
    let stalkRange;
    let stalkColor;
    let stalkHeight = [];
    let stalkDelay;
    let gens;

    // adjustable values
    let density = 84;

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
        stalks = density;
        stalkMin = vpHeight / 6;
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
            gens = Math.round(vpHeight / stalkHeight[i] + 3);
            stalkDelay = getValue(0, 30) / 10;
            stalkColor = `hsl(${220 - 90 * (stalkHeight[i] - stalkMin) / stalkRange}, ${getValue(67, 78) + 20 * (stalkHeight[i] - stalkMin) / stalkRange}%, ${getValue(20, 26) + 13 * (stalkHeight[i] - stalkMin) / stalkRange}%)`;
            for(let j = 0; j < gens; j++){
                const newSeg = document.createElement('div');
                newSeg.classList.add('segment', `gen${j}`, `stalk${i}`);
                newSeg.style.width = `${stalkHeight[i] / 8}px`;
                if(j > 0){
                    newSeg.style.height = `${stalkHeight[i]}px`;
                    newSeg.style.background = stalkColor;
                    newSeg.style.animationDelay = `${-1.2 * (10 - j) - stalkDelay}s`;
                    vp.querySelector(`.gen${j - 1}.stalk${i}`).appendChild(newSeg);
                } else {
                    newSeg.style.left = `${getValue(-vpWidth / 5, vpWidth * 1.2)}px`;
                    newSeg.style.bottom = `-${getValue(stalkHeight[i] / 20, stalkHeight[i])}px`;
                    newSeg.style.animationDelay = `${-2 - stalkDelay}s`;
                    vp.appendChild(newSeg);
                }
            }
        }
    }

    window.addEventListener('load', (event) => {
        reset();
    });

    seagrass.addEventListener('click', reset);

    window.addEventListener('resize', function(){
        setTimeout(function(){
            if(vp.offsetWidth != vpWidth){
                reset();
            }
        }, 200);
    });
}())