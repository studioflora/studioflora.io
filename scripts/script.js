(function(){
    'use strict';
    console.log('reading js');

    // Uh oh... who's in here with me?

    // roll call
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const navbar = document.querySelector('nav.hide-on-scroll');
    const menu = document.querySelector('#menu');
    const menuLis = document.querySelectorAll('#menu li').length;
    const toggleMenu = document.querySelector('#toggle-menu');
    const toggleMenuImg = document.querySelector('#toggle-menu-img');
    
    // initialize menu toggle
    let menuState = 0;
    let previousScrollPosition = 0;

    // wait until window is loaded
    window.addEventListener('load', function(){

        // mobile menu toggle
        toggleMenu.addEventListener('click', function(e){
            e.preventDefault();

            if(menuState == 0){
                openMenu();
            }else{
                closeMenu();
            }
        });

        function openMenu(){
            toggleMenuImg.setAttribute('href', '/assets/sf-icons.svg#close');
            menu.classList.remove('closed');
            menu.style.height = `${menuLis * 2.25}em`;
            main.classList.add('unfocus');
            footer.classList.add('unfocus');
            menuState = 1;
        }

        function closeMenu(){
            toggleMenuImg.setAttribute('href', '/assets/sf-icons.svg#openmenu');
            menu.classList.add('closed');
            menu.style.height = '0';
            main.classList.remove('unfocus');
            footer.classList.remove('unfocus');
            menuState = 0;
        }

        // hide nav on scroll
        // currently deactivated
        // if(navbar){
        //     window.addEventListener('scroll', function() {
        //         let currentScrollPosition = window.scrollY;
    
        //         if (currentScrollPosition > previousScrollPosition) {
        //             // user is scrolling down
        //             navbar.classList.add('collapsed');
        //         } else {
        //             // user is scrolling up
        //             navbar.classList.remove('collapsed');
        //         }
        //         previousScrollPosition = currentScrollPosition;
        //     });
        // }
    });
}());