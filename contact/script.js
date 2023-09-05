(function(){
    'use strict';
    console.log('reading js');

    const form = document.querySelector('form');
    const contact = document.querySelector('#emailus');
    const contactSuccess = document.querySelector('#contact-success');

    form.onsubmit = function(e){
        contact.classList.add('hidden');
        contactSuccess.classList.remove('hidden');
    }
}())