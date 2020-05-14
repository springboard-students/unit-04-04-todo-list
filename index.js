'use strict';

import {
  addItem,
  getLastEnabled,
  hasSavedData,
  isEnabled,
  removeItem,
  saveDefaultTodo,
  saveList,
  updateLastEnabled
} from './commons.js';

import {config} from './cfg.js';

let mainDiv = document.querySelector('#main-div');
let listDiv = document.querySelector('#list-div');

addItem(listDiv);

window.addEventListener('DOMContentLoaded', function () {
  if (!hasSavedData()) {
    saveDefaultTodo();
  }
});

listDiv.addEventListener('change', function (e) {
  let changed = e.target;
  console.log('what changed:', changed);
  if (changed.classList.contains('text')) {
    changed.toggleAttribute('disabled');
    changed.classList.toggle('is-editing');
    saveList();
    console.log('changed:', changed);
  }
});

mainDiv.addEventListener('click', function (e) {
  e.preventDefault();

  let clicked = e.target;

  if (clicked.id === 'new-div') {
    addItem(listDiv);
  }


  let item = clicked.closest('.item');

  if (!item) {
    console.log('not an item');
    updateLastEnabled();
    return;
  }

  item.classList.toggle('clicked');

  let isItem = clicked.classList.contains('item');

  let isTextArea = clicked.classList.contains('text');

  let clickedParent = clicked.parentElement;
  let isDoneBt      = clickedParent.classList.contains('done');
  let isRemoveBt    = clickedParent.classList.contains('remove');

  if (isTextArea) {

    // The state is toggled
    clicked.toggleAttribute('disabled');

    // And the class 'is-editing' is removed from the Textarea
    clicked.classList.toggle('is-editing');

    // And the 'disabled' attribute is toggled
    if (clicked.getAttribute('disabled')) {
      clicked.removeAttribute('disabled');
    } else {
      clicked.setAttribute('disable', 'true');
    }


    // If the stated was changed to 'enabled'
    if (isEnabled(item)) {
      // The focus is given to this text area
      clicked.focus();
      if (getLastEnabled() && getLastEnabled().id !== item.id) {
        // The previous enabled text area is updated
        updateLastEnabled();
        clicked.setAttribute('id', 'last_enabled');
      }
    }
  } else if (isDoneBt) {
    item.classList.toggle('item-completed');
    item.firstChild.classList.toggle('completed');
    let content       = item.querySelector('.option-content');
    content.innerHTML =
      content.textContent === config.symbols.done ? config.symbols.reopen :
      config.symbols.done;
    item.querySelector('.options').classList.toggle('option-completed');

    saveList();

  } else if (isRemoveBt) {
    removeItem(item);
  } else if (isItem) {
    item.classList.toggle('clicked');
  } else {
    console.log('No action');
  }
});

