//const moveToSlide1 = document.getElementById('move-to-slide-1');
'use strict';

const electron = require('electron');
const remote = electron.remote;
const mainProcess = remote.require('./main');

// Define the app's buttons
const moveToSlide2 = document.getElementById('move-to-slide-2');
const moveToSlide3 = document.getElementById('move-to-slide-3');
const moveToSlide4 = document.getElementById('move-to-slide-4');

// Define the app's inputs
const addName = document.getElementById('addName');
const addEmail = document.getElementById('addEmail');
const addJoin = document.getElementById('addJoin');
const addInterest = document.getElementById('addInterest');
const addInfo = document.getElementById('addInfo');
const addFriend = document.getElementById('addFriend');

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

let clearForm = () => {
  addName.value = '';
  addEmail.value = '';
  addJoin.checked = false;
  addInterest.checked = false;
  addInfo.checked = false;
  addFriend.checked = false;
}

let submitForm = () => {
  console.log('submitting form');
  // Grab the form to submit
  let form = {
    name: addName.value,
    email: addEmail.value,
    interests: []
  };
  
  if (addJoin.checked) {
    form.interests.push('Would like to join.');
  }
  if (addInterest.checked) {
    form.interests.push('Might like to join in the future.');
  }
  if (addInfo.checked) {
    form.interests.push('Would like to get more info.')
  }
  if (addFriend.checked) {
    form.interests.push('Contact my friend.');
  }
  
  // Send the form to the main process for saving
  mainProcess.saveResults(form);
}

// Plug up navigation listeners
moveToSlide2.addEventListener('click', () => {
  manageState(2);
});

moveToSlide3.addEventListener('click', () => {
  manageState(3);
});

moveToSlide4.addEventListener('click', () => {
  manageState(4);
  submitForm();
  setTimeout(() => {
    manageState(1);
    clearForm();
  }, 5000);
});