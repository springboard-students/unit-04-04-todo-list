'use strict';

import {config} from './cfg.js';

let todo;

const saveTodo = function (json) {
  console.log('Saving todo...');
  localStorage.setItem('todo', JSON.stringify(json));
};

const saveDefaultTodo = function () {
  console.log('Saving default todo...');
  saveTodo(config.defaults);
};

// ???
const hasSavedData = function () {
  return todo !== null && todo !== undefined;
};

const isEmpty = function (obj) {
  return obj === null ||
         obj === 'null' ||
         obj === undefined ||
         obj === 'undefined' ||
         typeof obj === 'undefined' ||
         (typeof obj.length !== 'undefined' && obj.length === 0) ||
         obj.size === 0;
};

const addItem = function (elem) {

  const item = document.createElement('div');
  item.classList.add('item');

  const text = document.createElement('textarea');
  text.classList.add('text');
  text.setAttribute('disabled', 'true');

  const options = document.createElement('div');
  options.classList.add('options');

  const done = document.createElement('div');
  done.classList.add('option', 'done');

  const remove = document.createElement('div');
  remove.classList.add('option', 'remove');

  const doneOptionContent = document.createElement('span');
  doneOptionContent.classList.add('option-content', 'disable-selection');
  doneOptionContent.innerHTML = config.symbols.done;

  const removeOptionContent = document.createElement('span');
  removeOptionContent.classList.add('option-content', 'disable-selection');
  removeOptionContent.innerHTML = config.symbols.remove;

  //

  done.appendChild(doneOptionContent);
  remove.appendChild(removeOptionContent);
  options.appendChild(done);
  options.appendChild(remove);
  item.append(text);
  item.appendChild(options);

  //

  elem.appendChild(item);
  saveList();

};

const removeItem = function (elem) {
  elem.remove();
  saveList();
};

const allItems = function () {
  return document.querySelectorAll('.item');
};

const allTextareas = function () {
  return document.querySelectorAll('textarea');
};

const saveList = function () {
  const todo = {data: []};
  const items = allItems();
  items.forEach((item) => {
    todo.data.push({
                     "text"     : item.firstChild.value,
                     "completed": item.classList.contains('item-completed')
                   });
  });
  localStorage.setItem("todo", JSON.stringify(todo));
  console.log('retrieved:', localStorage.getItem('todo'));
};

const getLastEnabled = function () {
  return document.querySelector('#last_enabled');
};

const updateLastEnabled = function () {
  const lastEnabled = getLastEnabled();
  if (lastEnabled) {
    lastEnabled.removeAttribute('id');
    lastEnabled.setAttribute('disabled', true);
    lastEnabled.classList.remove('is-editing');
    lastEnabled.closest('.item')
               .classList
               .remove('clicked');
    console.log('last previous cleaned', lastEnabled);
  }
  return !isEmpty(lastEnabled);
};

const isEnabled = function (item) {
  const ta = item.querySelector('textarea');
  const result = isEmpty(ta.getAttribute('disabled'));
  console.log('ta', ta, 'result', result);
  return result;
};

const toggleEnableDisable = function( txtArea ){
  if ( isEmpty( txtArea.getAttribute('disabled') ) )
  {
    txtArea.setAttribute('disabled', 'true');
    return;
  }
  txtArea.removeAttribute('disabled');
}

export {
  todo,
  saveTodo,
  saveDefaultTodo,
  hasSavedData,
  addItem,
  removeItem,
  saveList,
  isEmpty,
  updateLastEnabled,
  isEnabled,
  getLastEnabled,
  toggleEnableDisable
}
