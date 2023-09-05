(function(){
    'use strict';
    console.log('reading js');

    // make sure to remove animation time before loading page to prevent "load-flipping"

    let zine = document.querySelector('.zine');
    let pages =  document.querySelectorAll('.zine .page');
    let spreads;
    let evens = [];
    let odds = [];
    let angle = 20;
    let currentSpread = -1;
    let halfScreenWidth;
    let zineMid;
    let zineIntro = 0;

    if(pages.length % 2 != 0){
        const lastPage = document.createElement('div');
        zine.appendChild(lastPage);
        pages =  document.querySelectorAll('.zine div');
    }

    spreads = pages.length / 2 - 1;

    for(let i = 0; i < pages.length; i++){
        if (i % 2 == 0){ evens.push(pages[i]); } else { odds.push(pages[i]) }
    }

    for(let i = 0; i < evens.length; i++){
        evens[i].style.zIndex = spreads - [i];
        odds[i].style.zIndex = [i];

        evens[i].style.transform = `rotateY(${-(spreads - i) * angle / spreads}deg)`;
        odds[i].style.transform = `rotateY(${180 - (spreads - i) * angle / spreads}deg)`;
    }

    function flip(e){
        if(e.clientX < halfScreenWidth){
            prevPage();
        }else{
            nextPage();
        }
    }

    function checkPage(){
        for(let i = 0; i < evens.length; i++){
            if(i <= currentSpread){
                evens[i].style.transform = `rotateY(${(i) * angle / spreads - 180}deg)`;
                odds[i].style.transform = `rotateY(${(i) * angle / spreads}deg)`;
            }else{
                evens[i].style.transform = `rotateY(${-(spreads - i) * angle / spreads}deg)`;
                odds[i].style.transform = `rotateY(${180 - (spreads - i) * angle / spreads}deg)`;
            }  
        }
    }

    function nextPage(){
        if(currentSpread < spreads){
            zine.classList.add('active-zine');
            currentSpread++;
            evens[currentSpread].style.transform = `rotateY(${(currentSpread) * angle / spreads - 180}deg)`;
            odds[currentSpread].style.transform = `rotateY(${(currentSpread) * angle / spreads}deg)`;
        }
    }

    function fan(){
        for(let i = 0; i < evens.length; i++){
            evens[i].style.transform = `rotateY(-${180 - (180 / spreads * i)}deg)`;
            odds[i].style.transform = `rotateY(${180 / spreads * i}deg)`;
        }

        if(evens.length % 2 != 0){
            evens[Math.floor(evens.length / 2)].style.transform = 'rotateY(-89.5deg)';
            odds[Math.floor(evens.length / 2)].style.transform = 'rotateY(90.5deg)';
        }
    }

    function prevPage(){
        if(currentSpread > -1){
            zine.classList.add('active-zine');
            evens[currentSpread].style.transform = `rotateY(${-(spreads - currentSpread) * angle / spreads}deg)`;
            odds[currentSpread].style.transform = `rotateY(${180 - (spreads - currentSpread) * angle / spreads}deg)`;
            currentSpread--;
        }
    }

    function measureScreen(){
        halfScreenWidth = window.innerWidth / 2;
        zineMid = (window.innerHeight - zine.offsetHeight) / 2;
    }

    window.addEventListener('scroll', function(){
        if(zine.getBoundingClientRect().top < zineMid && currentSpread == -1 && zineIntro == 0){
            zineIntro = 1;
            nextPage();
        }else if(zineIntro == 1 && zine.getBoundingClientRect().top > window.innerHeight){
            zineIntro = 0;
            currentSpread = -1;
            checkPage();
        };
    });

    // zine.addEventListener('mouseover', fan);
    zine.addEventListener('mouseout', checkPage);

    window.addEventListener('load', measureScreen);
    zine.addEventListener('mousedown', flip);
}())