(function(){
    'use strict';
    console.log('reading js');

    const plantcards = document.querySelectorAll('.plantcard');
    const clouds = document.querySelector('#cloudstack iframe');
    const zine = document.querySelector('.zine');

    function resizePcs() {
        plantcards.forEach(card => {
            card.style.fontSize = `${card.offsetWidth / 50}px`;
        })

        clouds.style.height = `${clouds.offsetWidth * .5625}px`;
        zine.style.height = `${document.querySelector('.zine .page').offsetHeight}px`;
    }
    
    window.addEventListener('load', resizePcs);
    window.addEventListener('resize', resizePcs);
}());