(function(){
    'use strict';
    console.log('reading js');

    window.onload = function(){
        const waveTexts = document.querySelectorAll('.sf-text-wave');
        let scale = 40;

        for(let i = 0; i < waveTexts.length; i++){
            if(waveTexts[i].classList.contains('slow-wave')){
                scale = 70;
            }

            let text = waveTexts[i].textContent.split(' ');
            let tally = 0;
            waveTexts[i].textContent = '';
            
            for(let j = 0; j < text.length; j++){
                const word = document.createElement('span');
                for(let k = 0; k < text[j].length; k++){
                    const span = document.createElement('span');
                    span.textContent = text[j][k];
                    span.style.animationDelay = `${tally * scale + 200}ms`;
                    tally++;
                    word.appendChild(span);
                }
                waveTexts[i].appendChild(word); 
                waveTexts[i].innerHTML += ' ';
            }
            waveTexts[i].classList.add('active');
        }
    }
}())