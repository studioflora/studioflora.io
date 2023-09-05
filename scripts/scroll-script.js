window.addEventListener('load', function(){
    'use strict';
    console.log('reading js');

    const scrollElements = document.querySelectorAll('.scroll-in');

    scrollElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 100 + 200}ms`
        element.classList.add('scroll-show')
    })

    let banner = document.querySelector('#banner');

    if(banner){
        banner.classList.add('active');
    }
})