/* eslint-disable */

// validate email address
export const validateEmail = str =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);

// generate uuid RFC4122 version 4
export const uuid = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );

// Get a random floating point number between `min` and `max`
// https://gist.github.com/kerimdzhanov/7529623
export function getRandomFloatingPoint(min, max) {
  return Math.random() * (max - min) + min;
}

// Get a random integer between `min` and `max`
// https://gist.github.com/kerimdzhanov/7529623
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Return random key from array
export function getRandomKey(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Shuffle an array
// http://www.jstips.co/en/shuffle-an-array/
export function shuffleArray(arr) {
  let i, j, temp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// Get url params
// https://davidwalsh.name/query-string-javascript
export function getUrlParams(item) {
  item = item.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + item + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Email validation
export function isEmailAddress(value) {
  const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(value);
}

// Check letter count
export function checkLetterCount(input, limit) {
  if (input.length > limit) {
    return false;
  }
  return true;
}

// Load script async
export function loadScriptAsync(src, callback) {
  const wf = document.createElement('script');
  const s = document.getElementsByTagName('script')[0];
  wf.src = src;
  wf.async = 'true';
  if (callback) {
    wf.onload = callback;
  }
  s.parentNode.insertBefore(wf, s);
}

export function buildReadableDate(input) {
  const date = new Date(input),
  month = ('0' + (date.getMonth() + 1)).slice(-2),
  day = ('0' + date.getDate()).slice(-2), year = date.getFullYear();
  return month + '.' + day + '.' + year;
}
