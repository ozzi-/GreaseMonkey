// ==UserScript==
// @name        openbugbounty - vulnerable link URL
// @namespace   com.zgheb.obb.vulnclicklink
// @description obb changed the vulnerable link from a href to a textarea, this reverts it
// @include     https://www.openbugbounty.org/*
// @version     1
// @grant       none
// @require https://code.jquery.com/jquery-3.2.1.slim.min.js
// ==/UserScript==
$(function () {
  var content = $('textarea[name=\'post\']').val();
  $('textarea[name=\'post\']').replaceWith('<a href="' + content + '">' + content + '</a>');
});
