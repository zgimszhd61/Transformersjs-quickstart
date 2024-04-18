// ==UserScript==
// @name         Transformers.js Quickstart
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the web with Transformers.js
// @author       You
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @connect      *
// ==/UserScript==

(async function() {
    'use strict';

    // 动态加载 Transformers.js
    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {  // only required for IE <9
            script.onreadystatechange = function() {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Others
            script.onload = function() {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // 加载 Transformers.js 后执行
    loadScript("https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.0", async function() {
        console.log("Transformers.js loaded successfully!");
        const transformers = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.0');
        const generator = await transformers.pipeline('text-generation', 'Xenova/distilgpt2');
        const text = 'I enjoy walking with my cute dog,';
        const output = await generator(text);
        alert(output[0].generated_text);
    });
})();
