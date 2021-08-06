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

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(val =>{
val.addEventListener('click', openModal);
})
  

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//181. Selecting, Creating, and Deleting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('srction--1');
const allbuttons = document.getElementsByTagName('button');
console.log(allbuttons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
//let d1 = document.getElementById('one');
// const html = '<div id="two">two</div>';
//d1.insertAdjacentHTML('afterend', html);
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies. <button class='btn btn--close-coockie'>Got it! </button>`;
//header.prepend(message);
header.append(message);
//header.append(message.cloneNode(true));

//header.before(message);
//header.after(header);

//Delete elements
document.querySelector('.btn--close-coockie').addEventListener('click', function(){
  //header.removeChild(message);
  message.remove();
  //message.parentElement.removeChild(message);
})

//styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

message.style.height = (Number.parseFloat(getComputedStyle(message).height,10)) +20+'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes

/*const logo = document.querySelector('.nav__logo');
console.log(logo);
console.log(logo.src); 
console.log(logo.className); 
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo);

console.log(logo.src);
console.log(logo.getAttribute('src'));

let twitterLink =document.querySelector('.twitter-link');
console.log(twitterLink.getAttribute('href'));

//Data attribute
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c');
logo.classList.remove('c')
logo.classList.toggle('c','j', 'k');
console.log(logo.classList);
console.log(logo.classList.contains('c'));
*/

//183. Implementing Smooth Scrolling

let btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  e.preventDefault;
  const section1 = document.querySelector('#section--1');
    const s1cords = section1.getBoundingClientRect();
    /*
    console.log(s1cords);
    console.log(e.target.getBoundingClientRect());
    console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);
    console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
    */

    //Scrolling
    /*
    window.scrollTo(
       s1cords.left + window.pageXOffset,
       s1cords.top + window.pageYOffset
       );
       */

    //better version of scrolling
    /*
    window.scrollTo({
      left: s1cords.left + window.pageXOffset,
      top:  s1cords.top + window.pageYOffset,
      behavior: 'smooth',
    })
    /*/

    //The newest way to scroll
    section1.scrollIntoView({behavior: 'smooth'});
})

  
  //184. Types of Events and Event Handlers

  const h1 = document.querySelector('h1');
  const alertH1 = function(e){
    alert('addEventlistener: Great!')
  
  //h1.removeEventListener('mouseenter',alertH1);
  };
  h1.addEventListener('mouseenter', alertH1);
  
  //setTimeout(()=> h1.removeEventListener('mouseenter',alertH1), 3000);


  /*h1.onmouseenter = function(e){
    alert('addEventlistener: Great!')
  };
  */

  //185. Event Propagation: Bubbling and Capturing
  const randomInt = (min, max) => Math.floor(Math.random()*(max-min+1)+min);
  const randomColor = () =>`rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`
  
  document.querySelector('.nav__link').addEventListener('click',function(e){
    this.style.backgroundColor = randomColor();
  })