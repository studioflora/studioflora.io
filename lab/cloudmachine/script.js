(function(){
    'use strict';
    console.log('reading js');

    // roll call
    const clouds2a = document.getElementById('clouds-2a');
    const clouds2b = document.getElementById('clouds-2b');
    const clouds3a = document.getElementById('clouds-3a');
    const clouds3b = document.getElementById('clouds-3b');
    const birds = document.getElementById('birds');
    const main = document.querySelector('main');
    const artboard = document.querySelector('#artboard');
    const fs = document.querySelector('#fs');

    let assetsPath = '/lab/cloudmachine/assets/'

    // initiate measurement
    // let fixedHeight;
    let ratio;
    let cloudType;
    let cloudWidth;
    let cloudSpeed;
    let cloudOffset;
    let birdFlap = 0;
    let birdHeight;
    let birdSize;
    let birdSpeed;
    let birdDelay;
    let scrollTimeout;
    let isScrolling = 0;
    let allClouds;
    let screenMode = 0;
    let newBird;

    function createCloudLayer(cloudColor, cloudCount, cloudLayer){
        // let cloudLayer;
        switch(cloudColor){
            case 'a':   // back layer
                for(let i = 0; i < cloudCount; i++){
                    // cloudLayer = 2;
                    cloudType = Math.ceil(Math.random() * 2) + 3;
                    switch(cloudType){
                        case 4:
                            cloudWidth = Math.ceil(Math.random() * 45) + 25;
                            break;
                        default:
                            cloudWidth = Math.ceil(Math.random() * 50) + 20;
                            break;
                    }
                    cloudSpeed = (Math.ceil(Math.random() * 150) + 100) * ratio;
                    cloudOffset = -Math.ceil(cloudSpeed / Math.random());
                    createCloud(cloudColor, cloudLayer);
                }
                break;
            default:    // front layer
                for(let i = 0; i < cloudCount; i++){
                    cloudType = Math.ceil(Math.random() * 4);
                    switch(cloudType){
                        case 1:
                            // cloudLayer = Math.ceil(Math.random() * 1.5) + 1;
                            cloudWidth = Math.ceil(Math.random() * 35) + 25;
                            break;
                        case 2:
                            // cloudLayer = Math.ceil(Math.random() * 2) + 1;
                            cloudWidth = Math.ceil(Math.random() * 40) + 15;
                            break;
                        case 3:
                            // cloudLayer = Math.ceil(Math.random() * 1.5) + 1;
                            cloudWidth = Math.ceil(Math.random() * 45) + 25;
                            break;
                        default:
                            // cloudLayer = Math.ceil(Math.random() * 2) + 1;
                            cloudWidth = Math.ceil(Math.random() * 35) + 15;
                            break;
                    }
                    cloudSpeed = (Math.ceil(Math.random() * 80) + 80) * ratio;
                    cloudOffset = -Math.ceil(cloudSpeed / Math.random());
                    createCloud('a', cloudLayer);
                    createCloud(cloudColor, cloudLayer);
                }
                break;
        }
    }

    function createCloud(cloudColor, cloudLayer){
        const cloud = document.createElement('img');
        cloud.src = `${assetsPath}${cloudType}${cloudColor}.svg`;
        cloud.style.width = `${cloudWidth}em`;
        cloud.classList.add('cloud');
        cloud.classList.add(`cloud-${cloudColor}`);
        cloud.style.animationDuration = `${cloudSpeed}s`;
        cloud.style.animationDelay = `${cloudOffset}s`;
        eval(`clouds${cloudLayer}${cloudColor}`).appendChild(cloud);
    }

    function randomBird(delay = 0){
        birdHeight = Math.round(Math.random() * 30) + 30;
        birdSize = (Math.round(Math.random() * 4) + 9) / 10;
        birdSpeed = Math.round((Math.random() * 40 + 30) * ratio);
        birdDelay = delay;
        createBird();
        if(delay == 0 && Math.ceil(Math.random() * 5) == 1){
            console.log('double!');
            birdHeight += Math.round(Math.random() * 10) - 5;
            birdSize += Math.round(Math.random() * 0.25) - 0.125;
            setTimeout(createBird, Math.round(Math.random() * 2000 + 500));
        }
        newBird = setTimeout(randomBird, (Math.round(Math.random() * 20000) + 6000) * ratio);
    }

    function createBird(){
        const bird = document.createElement('img');
        bird.classList.add('bird');
        if(birdFlap == 0){birdFlap = 1;} else{birdFlap = 0;};
        bird.src = `${assetsPath}bird-${birdFlap}.gif`;
        bird.style.bottom = `${birdHeight}em`;
        bird.style.animationDelay = `${birdSpeed * -birdDelay}s`;
        bird.style.animationDuration = `${birdSpeed}s`;
        bird.style.height = `${birdSize}em`;
        bird.style.width = `${birdSize}em`;
        setTimeout(function(){
            bird.remove();
        }, `${(birdSpeed) * 1000}`);
        birds.appendChild(bird);
    }

    function createClouds() {
        allClouds = document.querySelectorAll('.cloud');
        allClouds.forEach(cloud => {
            cloud.remove();
        });
        while(birds.firstChild){
            birds.firstChild.remove();
        }
        ratio = Math.round(100 * window.innerWidth / window.innerHeight) / 100;
        createCloudLayer('a', Math.round(3 * ratio), 2);
        createCloudLayer('b', Math.round(3 * ratio), 3);
        clearTimeout(newBird);
        randomBird(Math.round(Math.random() * 100) / 100);
        artboard.classList.add('active');
    }

    function pauseAnimations(){
        isScrolling = 1;
        allClouds.forEach(cloud => {
            cloud.style.animationPlayState = 'paused';
        });
        ls1.style.animationPlayState = 'paused';
        ls3.style.animationPlayState = 'paused';
    }

    function resumeAnimations(){
        isScrolling = 0;
        allClouds.forEach(cloud => {
            cloud.style.animationPlayState = 'running';
        });
        ls1.style.animationPlayState = 'running';
        ls3.style.animationPlayState = 'running';
    }

    window.addEventListener('load', function(){
        setTimeout(createClouds, 200);
    });

    // technically depreciated but Safari doesn't support the new version
    window.addEventListener('orientationchange', function(){
        setTimeout(function(){
            createClouds();
        }, 500);
    });

    artboard.addEventListener('mousedown', createClouds);

    window.addEventListener('scroll', function(){
        if(isScrolling == 0){
            pauseAnimations();
        }
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(resumeAnimations, 500);
    });

    if(fs){
        fs.addEventListener('click', function(e){
            e.preventDefault();
            if(screenMode == 0){
                main.requestFullscreen();
                screenMode = 1;
            }else {
                document.exitFullscreen();
                screenMode = 0;
            }
        });
    }
}())