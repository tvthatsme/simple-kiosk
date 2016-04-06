//const moveToSlide1 = document.getElementById('move-to-slide-1');
'use strict';

// Define the app's buttons
const moveToSlide2 = document.getElementById('move-to-slide-2');
const moveToSlide3 = document.getElementById('move-to-slide-3');
const moveToSlide4 = document.getElementById('move-to-slide-4');

// Define the app's slides
const slides = [
  document.getElementById('slide-1'),
  document.getElementById('slide-2'),
  document.getElementById('slide-3'),
  document.getElementById('slide-4')
];

let manageState = slideNum => {
  for (let i = 0; i < slides.length; i++) {
    if ((i + 1) == slideNum) {
      slides[i].classList.remove('hidden');
    } else {
      slides[i].classList.add('hidden');
    }
  }
}

// Plug up navigation listeners
moveToSlide2.addEventListener('click', () => {
  console.log('move to slide 2');
  manageState(2);
});

moveToSlide3.addEventListener('click', () => {
  console.log('move to slide 3');
  manageState(3);
});

moveToSlide4.addEventListener('click', () => {
  manageState(4);
  setTimeout(() => {
    manageState(1)
  }, 5000);
});