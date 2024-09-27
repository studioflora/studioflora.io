(function(){
    // 'use strict';
    console.log('reading js');

    const favicon = document.querySelector('#favicon');
    const timerImg = document.querySelector('#counter-img');
    const timerForm = document.querySelector('#counter');
    const hrs = document.querySelector('#hrs');
    const hrsInput = document.querySelector('#hrs-input');
    const mins = document.querySelector('#mins');
    const minsInput = document.querySelector('#mins-input');
    const startButton = document.querySelector('#start');
    const resetButton = document.querySelector('#reset');
    const chirpSound = new Audio('assets/2chirpz.mp3');
    const origHrs = '00';
    const origMins = 30;
    let timerStage;
    let timerDuration;
    let prevDuration;
    let start;
    let timer;
    let flashInterval;
    let chirpInterval;
    let chirpRepeat;
    let delta;
    let timerState = 0;  // 0-reset, 1-playing, 2-paused 3-done

    function updateFavicon() {
        favicon.href = `assets/favicons/${timerState}-${timerStage}.png`;
        timerImg.src = `assets/favicons/${timerState}-${timerStage}.png`;
    }

    function dimInputs(){
        mins.classList.add('dimmed');
        hrs.classList.add('dimmed');
    }

    function unDimInputs(){
        mins.classList.remove('dimmed');
        checkHrs();
    }

    function checkHrs(){
        if(hrsInput.value == 0){
            hrs.classList.add('dimmed');
        }else{
            hrs.classList.remove('dimmed');
        }
    }

    function chirp(){
        chirpRepeat = setInterval(function(){
            chirpSound.play();
        }, 1000);

        setTimeout(function(){
            clearInterval(chirpRepeat);
        }, 4000);
    }

    function flash(){
        if(timerStage){
            timerStage = 0;
        }else{
            timerStage = 1;
        }
        updateFavicon();
    }

    function alarm(){
        clearInterval(timer);
        timerStage = 0;
        timerState = 3;
        updateFavicon();
        startButton.innerText = 'stop';
        chirp();
        chirpInterval = setInterval(chirp, 6000);
        flashInterval = setInterval(flash, 1000);
    }

    function updateTimer(){
        delta = Date.now() - start;
        if(Math.floor(delta / 1000) > timerDuration * timerStage){
            timerStage++;
            if(timerStage > 59){
                alarm();
            }else{ 
                updateFavicon(); 
            };
        };
    }

    function playTimer(){
        timerDuration = (hrsInput.value * 60 + minsInput.value);
        if(timerState == 0){
            prevDuration = timerDuration;
        }
        if(timerDuration == 0 || prevDuration != timerDuration){
            resetTimer();
            playTimer();
            return;
        }
        start = Date.now() - delta;
        timerState = 1;
        dimInputs();
        updateFavicon();
        startButton.innerText = 'pause';
        timer = setInterval(updateTimer, 100);
    }

    function pauseTimer(){
        clearInterval(timer);
        timerState = 2;
        updateFavicon();
        startButton.innerText = 'resume';
    }

    function resetTimer(){
        if(timerState == 0){
            hrsInput.value = origHrs;
            minsInput.value = origMins;
        }
        checkHrs();
        clearInterval(flashInterval);
        clearInterval(chirpInterval);
        clearInterval(chirpRepeat);
        clearInterval(timer);
        timerStage = 0;
        delta = 0;
        timerState = 0;
        unDimInputs();
        updateFavicon();
        startButton.innerText = 'start';
    }

    function playPause(){
        switch (timerState){
            case 1:
                pauseTimer();
                break;
            case 3:
                resetTimer();
                break;
            default:
                playTimer();
                break;
        }
    }

    function checkInput(){
        let carry;
        let minsVal = Array.from(minsInput.value);
        let hrsVal = Array.from(hrsInput.value);

        if(minsVal.length > 2){
            carry = minsVal.splice(0, minsVal.length - 2);
            hrsVal = hrsVal.concat(carry);
        }else if(minsVal.length < 2){
            carry = hrsVal.splice(hrsVal.length - 2 + minsVal.length, 2 - minsVal.length);
            minsVal = carry.concat(minsVal);
        }

        if(hrsVal.length > 2){
            hrsVal.splice(0, hrsVal.length - 2);
        }else if(hrsVal.length < 2){
            while(hrsVal.length < 2){
                hrsVal.unshift(0);
            }
        }

        minsInput.value = minsVal.join('');
        hrsInput.value = hrsVal.join('');
        checkHrs();
    }
    
    minsInput.addEventListener('focus', function(){
        unDimInputs();
        if(timerState == 1){ 
            pauseTimer(); 
        }else if(timerState == 0){
            hrsInput.value = '00';
            minsInput.value = '00';
        }
    });
    minsInput.addEventListener('input', checkInput);
    hrsInput.addEventListener('input', checkInput);
    startButton.addEventListener('click', playPause);
    resetButton.addEventListener('click', resetTimer);
    timerForm.addEventListener('submit', function(e){
        e.preventDefault();
        hrsInput.blur();
        minsInput.blur();
        playTimer();
    });

    resetTimer();
}())