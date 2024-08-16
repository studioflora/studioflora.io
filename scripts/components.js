(function(){
console.log('reading components');
// Uh oh... who's in here with me?

/* 
   TO DO:
   [ ] move dm-display here
*/

function createDiv(className){
   let newDiv = document.createElement('div');
   newDiv.classList.add(className);
   return newDiv;
}

class Navbar extends HTMLElement {
   constructor() {
      super();
      this.innerHTML = `
         <nav class="darkmode flex-spread dropshadow padding">
            <a href="/" class="logo"><i>studio flora</i></a>
            <ul id="menu" class="flex closed">
               <li><a href="/tools">Tools</a></li>
               <li><a href="/">Gallery</a></li>
               <li><a href="/about">About</a></li>
               <li><a href="https://www.instagram.com/studioflora.io/"><svg><use href="/assets/sf-icons.svg#instagram"/></svg></a></li>
               <li><a href="https://www.tiktok.com/@studioflora.io"><svg><use href="/assets/sf-icons.svg#tiktok"/></svg></a></li>
            </ul>
            <a href="#" id="toggle-menu"><svg><use id="toggle-menu-img" href="/assets/sf-icons.svg#openmenu"/></svg></a>

            <svg class="corner" id="top-left-corner"><use href="/assets/sf-icons.svg#corner"/></svg>
            <svg class="corner" id="top-right-corner"><use href="/assets/sf-icons.svg#corner"/></svg>
         </nav>
      `
   }

   connectedCallback() {
      const main = document.querySelector('main');
      const footer = document.querySelector('footer-bar');
      const menu = document.querySelector('#menu');
      const menuLis = document.querySelectorAll('#menu li').length;
      const toggleMenu = document.querySelector('#toggle-menu');
      const toggleMenuImg = document.querySelector('#toggle-menu-img');
    
      let menuState = 0;

      // mobile menu toggle
      toggleMenu.addEventListener('click', function(e){
         e.preventDefault();

         if(menuState == 0){
             openMenu();
         } else {
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
   }
}

customElements.define('nav-bar', Navbar);

class FooterBar extends HTMLElement {
   constructor() {
      super();
      this.innerHTML = `
         <footer class="darkmode flex column">
            <section class="scroll-in grid">
               <a href="/" class="grid-4 spaced" id="monogram-footer"><div class="dmw-display"></div></a>
            </section>
            <nav class="scroll-in flex-center">
               <ul class="flex">
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/contact">Contact</a></li>
               </ul>
               <ul class="flex">
                  <li class="hide-mobile">—</li>
                  <li><a href="/">Studio Flora © 2024</a></li>
                  <li class="hide-mobile">—</li>
               </ul>
               <ul class="flex">
                  <li><a href="https://www.tiktok.com/@studioflora.io"><svg><use href="/assets/sf-icons.svg#tiktok"/></svg></a></li>
                  <li><a href="https://www.instagram.com/studioflora.io/"><svg><use href="/assets/sf-icons.svg#instagram"/></svg></a></li>
                  <li><a href="https://github.com/studioflora"><svg><use href="/assets/sf-icons.svg#github"/></svg></a></li>
               </ul>
            </nav>
         </footer>
      `
   }

   connectedCallback() {
      const display = document.querySelector('.dmw-display');
      let displayMatrix = [];
    
      const artboard = [
         "0000000000000000011111111",
         "0000000000000001111111111",
         "0000000000000011100000000",
         "0000000000000011000000000",
         "0000011111111111111110000",
         "0000111111111111111110000",
         "0000110000000011000000000",
         "0000111111000011000000000",
         "0000011111100011000000000",
         "0000000001110011000000000",
         "0000000000110011000000000",
         "0000000001110011000000000",
         "1111111111100011000000000",
         "1111111111000011000000000"
      ];

      // Build display
      for(let i = 0; i < artboard[0].length; i++){
         let newCol = createDiv('dm-col');
         for(let j = 0; j < artboard.length; j++){
               let cell = createDiv('dm-cell');
               cell.style.animationDelay=`-${j * 50 + (artboard[0].length - i) * 50}ms`;
               let dot = createDiv('dm-dot');
               dot.style.animationDelay=`-${(artboard[0].length - i) * 30 + j * 30 + 700}ms`;
               newCol.appendChild(cell).appendChild(dot);
         }
         display.appendChild(newCol);
      }

      for(let i = 0; i < artboard[0].length; i++){
         displayMatrix.push(document.querySelectorAll(`.dmw-display .dm-col:nth-of-type(${i + 1}) .dm-dot`));
      }

      for(let i = 0; i < displayMatrix.length; i++){
         for(let j = 0; j < displayMatrix[0].length; j++){
               displayMatrix[i][j].classList.remove('active');
         }
      }

      for(let i = 0; i < artboard.length; i++){
         for(let j = 0; j < artboard[0].length; j++){
               if(artboard[i][j] == 1){
               displayMatrix[j][i].classList.add('active');
               }
         }
      }
   }
}

customElements.define('footer-bar', FooterBar);
}());