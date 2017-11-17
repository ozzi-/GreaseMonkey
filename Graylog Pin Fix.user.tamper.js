// ==UserScript==
// @name         Graylog Pin Fix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replaces input text field with password for OTP input
// @include      https://graylog.*.ch/auth/token
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var tokenInput = document.getElementById("tokenValue");
    tokenInput.type="password";
})();
