// ==UserScript==
// @name        FB Sleep Stat Privacy
// @namespace   com.zgheb.fb-sleepstat
// @description Hides name in fb-sleep-stat
// @include     http://localhost:3000
// @version     1
// @grant       none
// @require https://code.jquery.com/jquery-3.2.1.slim.min.js
// ==/UserScript==

var interval;
$(function () {
  $('div.name').ready(function () {
    interval = setInterval(removeNames, 100);
  });
});

function removeNames() {
  if ($('div.name').length > 0) {
    console.log('removing names');
    $('div.name').each(function (index) {
      $(this).text('[Name]');
    });
    clearInterval(interval);
  }
}
