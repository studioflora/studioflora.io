console.log('reading components');
// Uh oh... who's in here with me?

function createDiv(className){
   let newDiv = document.createElement('div');
   newDiv.classList.add(className);
   return newDiv;
}

class Navbar extends HTMLElement {
   constructor() {
      super();
      this.innerHTML = `
         <nav class="dropshadow">
            <svg class="corner"><use href="/styles/sf-styles/sf-icons.svg#corner"/></svg>
            <svg class="corner"><use href="/styles/sf-styles/sf-icons.svg#corner"/></svg>
            <div id="mobile-nav" class="flex spread padding-s">
               <a href="/" class="logo"><i>studio flora</i></a>
               <a href="#" id="toggle-menu"><svg><use id="toggle-menu-img" href="/styles/sf-styles/sf-icons.svg#openmenu"/></svg></a>
            </div>
            <ul id="menu" class="flex closed gap-m">
               <li><a href="/tools">Tools</a></li>
               <li><a href="/">Gallery</a></li>
               <li><a href="/about">About</a></li>
               <li><a href="https://www.instagram.com/studioflora.io/"><svg><use href="/styles/sf-styles/sf-icons.svg#instagram"/></svg></a></li>
               <li><a href="https://www.tiktok.com/@studioflora.io"><svg><use href="/styles/sf-styles/sf-icons.svg#tiktok"/></svg></a></li>
            </ul>
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
         toggleMenuImg.setAttribute('href', '/styles/sf-styles/sf-icons.svg#close');
         menu.classList.remove('closed');
         menu.style.height = `${menuLis * 2.5}rem`;
         main.classList.add('unfocus');
         footer.classList.add('unfocus');
         menuState = 1;
      }

      function closeMenu(){
         toggleMenuImg.setAttribute('href', '/styles/sf-styles/sf-icons.svg#openmenu');
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
         <footer class="flex column">
            <section class="scroll-in grid">
               <a href="/" class="grid-4 padding-xl" id="monogram-footer"><div class="dmw-display"></div></a>
            </section>
            <nav class="scroll-in">
               <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="mailto:&#097;&#100;&#097;&#109;&#111;&#118;&#101;&#114;&#109;&#101;&#101;&#114;&#064;&#115;&#116;&#117;&#100;&#105;&#111;&#102;&#108;&#111;&#114;&#097;&#046;&#105;&#111;">Contact</a></li>
               </ul>
               <ul id="footer-socials">
                  <li class="hide-mobile">—</li>
                  <li><a href="https://www.tiktok.com/@studioflora.io"><svg><use href="/styles/sf-styles/sf-icons.svg#tiktok"/></svg></a></li>
                  <li><a href="https://www.instagram.com/studioflora.io/"><svg><use href="/styles/sf-styles/sf-icons.svg#instagram"/></svg></a></li>
                  <li><a href="https://github.com/studioflora"><svg><use href="/styles/sf-styles/sf-icons.svg#github"/></svg></a></li>
                  <li class="hide-mobile">—</li>
               </ul>
               <a href="/">Studio Flora © 2024</a>
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

class SFBanner extends HTMLElement {
   constructor() {
      super();
      this.innerHTML += `
         <style>
            sf-banner {
               /* font-size: .9em; */
               height: 0em;
               background: var(--hl-0);
               border-radius: var(--gap-l);
               display: flex;
               overflow: hidden;
               color-scheme: dark;
               /* z-index: 2; */
               transition: height var(--out);
               border-bottom: var(--border);
            }

            sf-banner a {
               /* line-height: 2em; */
               /* padding: 0 1.5em; */
               font-style: italic;
               color: var(--fg-0);
               /* font-weight: 400; */
               /* top: 0; */
               /* flex-shrink: 0; */
               animation: banner 15s forwards linear infinite;
            }

            @keyframes banner {
               from {
                  transform: translateX(-100%);
               }
               to {
                  transform: translateX(0%);
               }
            }

            @media (hover: hover) {
               #banner:hover {
                  background: var(--accent2);
               }
            }
         </style>
      `;
   }

   connectedCallback() {
      this.message = this.querySelector('a');
      const displayPercentage = Math.ceil(window.innerWidth / this.message.offsetWidth);
      for(let i = 0; i < displayPercentage + 3; i++) {
         console.log(this.message);
         this.appendChild(this.message);
      }
      this.style.height = '2em';
   }
}
customElements.define('sf-banner', SFBanner);