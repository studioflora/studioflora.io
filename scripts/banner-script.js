(function(){
        'use strict';
        console.log('reading js');

        const banner = document.querySelector('#banner');
        let bannerLinks;

        function measureBanner(){
            bannerLinks = document.querySelectorAll('#banner a');

            for(let i = 0; i < bannerLinks.length; i++){
                banner.removeChild(banner.lastChild);
            }

            const linksToGen = Math.ceil(banner.offsetWidth / bannerLinks[0].offsetWidth) + 1;

            for(let i = 0; i < linksToGen; i++){
                banner.appendChild(bannerLinks[0].cloneNode(true));
            }
        };

        window.addEventListener('load', measureBanner);
        window.addEventListener('resize', measureBanner);
}());