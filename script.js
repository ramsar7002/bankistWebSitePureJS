'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>{
  btn.addEventListener('click', openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
  
});


//////////////////////////////
//Page Navigation
//Bad solution because we make event handler for each item on the menu and it makes a perfomence problems
/*
document.querySelectorAll('.nav__link').forEach(function(e){
  e.addEventListener('click', function(e){
    e.preventDefault();
    const id=this.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  })
})
*/

//Page navigation using event delegation - the better option
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault()
  if(e.target.classList.contains('nav__link') && !e.target.classList.contains('btn--show-modal')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
}
})

//Implementing smooth scroliing on 'Learn more btn

const btnscrollTo= document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnscrollTo.addEventListener('click',(e)=>{
  //old fashion
  /*
  const s1coords = section1.getBoundingClientRect();
  //console.log(e.target.getBoundingClientRect());
  //console.log(pageXOffset, pageYOffset)
  //console.log(document.documentElement.clientHeight, document.documentElement.clientWidth);

  //window.scrollTo(s1coords.left+pageXOffset, s1coords.top+pageYOffset);
  window.scrollTo({
    left: s1coords.left+pageXOffset,
    top: s1coords.top+pageYOffset,
    behavior: "smooth"
  })
  */
  
  //New fashion
  section1.scrollIntoView({behavior:"smooth"})
})

//Show a cookie message on the screen
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent='We use cookies for improved functionality and analytics';
message.innerHTML='We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

let header = document.querySelector('.header')
//header.prepend(message)
//header.append(message.cloneNode(true))
//header.append(message)
//header.after(message)
header.before(message)

document.querySelector('.btn--close-cookie').addEventListener('click',(e)=>{
  e.preventDefault();
  //message.parentElement.removeChild(message);
  message.remove();
});



//using removeEventListener
/*
const h1 = document.querySelector('h1');

const alertH1 = (e)=>{
  console.log("fdfd");
  h1.removeEventListener('click', alertH1)
}

h1.addEventListener('click', alertH1);
*/


/*
const randomInt = (min,max)=> Math.floor(Math.random()*max-min+1+min);
const randomColor = ()=>`rgb(${randomInt(0,255)}, ${randomInt(0,255)},${randomInt(0,255)})`

document.querySelector('.nav__link').addEventListener('click', function(e){
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget)
})

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget)

})

document.querySelector('.nav').addEventListener('click', function(e){
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget)

}, false) //'true meaning -> called first when make a click on the features btn because this is the parent element
*/

//playing around with the dom elements (parents and childrens)
/*
//Going downwords: child
const h1=document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.children)
h1.firstElementChild.style.color='white'
h1.lastElementChild.style.color='orangered'

//Going upwords: parents
console.log(h1.parentNode)
console.log(h1.parentElement)

h1.closest('.header').style.background='var(--gradient-secondary)'
h1.closest('h1').style.background='var(--gradient-primary)'

//Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el){
  if(el!=h1){
    el.style.transform='scale(0.5)'
  }
})
*/

//implement a Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  if(!clicked) return
    [...tabs].forEach(tab=>{
    tab.classList.remove('operations__tab--active')
    tab.classList.remove('operations__content--active')
  });

  [...tabsContent].forEach(tab=>{
    tab.classList.remove('operations__content--active')
  })
  clicked.classList.add('operations__tab--active')
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
  //Activate content area
});


//Over on link and make the other fade
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

const handleOver = function(e){
  if(e.target.classList.contains('nav__link')){
    [...navLinks].forEach(link=>{
      link.style.opacity=this;
    })
        //logo
        e.target.closest('.nav').querySelector('img').style.opacity=this;
        e.target.style.opacity='1';  
  }
}
nav.addEventListener('mouseover', handleOver.bind(0.5));
nav.addEventListener('mouseout', handleOver.bind(1));

//Implementing a Sticky Navigation:
//bad performance example
/*
const initialCoords = section1.getBoundingClientRect();
const cookieArea = document.querySelector('.cookie-message');
window.addEventListener('scroll',function(){
  if(window.scrollY>initialCoords.top){
    nav.classList.add('sticky');
  }
  else{
     nav.classList.remove('sticky');
  }

})
*/

//A better way to implement sticky navgiation
//Example of observer
/*
const obsCallBack = function(enteries, observer){
  enteries.forEach(entry=> {
    console.log(entry)
  })
}

const obsOptions = {
  root: null,
  threshold: [0.1, 0],
}
const obsever = new IntersectionObserver(obsCallBack,obsOptions);
obsever.observe(section1);
*/
header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect();
const stickyNav = function(entries){
  const entry = entries[0];
  if(!entry.isIntersecting)
    nav.classList.add('sticky');
    else
    nav.classList.remove('sticky');
  

}
const headerObserver = new IntersectionObserver(stickyNav,{
  root: null,
  threshold: 0,
  rootMargin:`-${navHeight.height}px`,
});
headerObserver.observe(header)

//Revealing Elements on Scroll

const revealSection = function(entries, observer){
  const [entry] = entries;
  console.log(entry)

  if(!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
  
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.10,
  
})

const sections = document.querySelectorAll('.section');
sections.forEach(section=>{
  sectionObserver.observe(section);
  section.classList.add('section--hidden')
})

