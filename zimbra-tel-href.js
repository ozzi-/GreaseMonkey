// ==UserScript==
// @name        zimbra contact telephone fix
// @namespace   com.zgheb.zimbra
// @description creates clickable links for telephone numbers in contacts, please edit the (AT)include for your zimbra url
// @include     http://webmail*
// @version     1
// @grant       none
// @require https://code.jquery.com/jquery-3.2.1.slim.min.js
// ==/UserScript==
// following dom watcher from http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/
(function (win) {
  'use strict';
  var listeners = [
  ],
  doc = win.document,
  MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
  observer;
  function ready(selector, fn) {
    // Store the selector and callback to be monitored
    listeners.push({
      selector: selector,
      fn: fn
    });
    if (!observer) {
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      });
    }
    check();
  }
  function check() {
    for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
      listener = listeners[i];
      elements = doc.querySelectorAll(listener.selector);
      for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
        element = elements[j];
        if (!element.ready) {
          element.ready = true;
          listener.fn.call(element, element);
        }
      }
    }
  } 
  win.ready = ready;
}) (this);

ready('#ZmContactSplitView_1_Telefon_value', function (element) {
  //   \/ this hack is needed, because zimbra gives not unique ID's
  $('td[id="ZmContactSplitView_1_Telefon_value"]').each(function (index, value) {
    var number = $(this).text();
    //                  \/ we need _blank because otherwise the whole tab freezes up after clicking the tel href
    $(this).html('<a target="_blank" href="tel:' + number + '" data-rel="external">' + number + '</a>');
  });
});
