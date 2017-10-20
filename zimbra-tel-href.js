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
    listeners.push({
      selector: selector,
      fn: fn
    });
    if (!observer) {
      // Watch for changes in the document
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
      var element = doc.querySelector(listener.selector);
      if (!element.ready) {
        element.ready = true;
        listener.fn.call(element, element);
      }
    }
  }
  win.ready = ready;
}) (this);

// Inject telWin into page
function telWin (number) {
  // by calling the tel handler in a seperate window, we circumvent zimbra thinking we are leaving the page
  var text ="<html><body><a id='tel' href=\"tel:"+number+"\" onclick='window.close();'></a><script>document.getElementById('tel').click();<\/script><\/body><\/html>";
  var tW = window.open("about:blank", "Zweitfenster", "toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=9876, top=9876, width=1, height=1, visible=none");
  tW.document.write(text);
  tW.close();
}
var script = document.createElement('script');
script.appendChild(document.createTextNode(telWin));
(document.body || document.head || document.documentElement).appendChild(script);

ready('#ZmContactSplitView_1_Telefon_value', function (element) {
  //   \/ this hack is needed, because zimbra gives not unique ID's
  $('td[id="ZmContactSplitView_1_Telefon_value"]').each(function (index, value) {
    var number = $(this).text();
     //                             we need this hack otherwise the whole tab freezes up after clicking the tel href,
     //                             because zimbra has some listeners that do a session end nw call 
    //                              (because it thinks we are leaving the page) that times out for some reason
    //                          \/  we could use target= _blank but that leaves the user on a ugly about:new page
    $(this).html('<a href="#Foo" onclick="telWin(\''+number+'\');" >'+number+'</a>');
  });
});
