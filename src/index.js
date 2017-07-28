/* global document */
const domready = require('domready');
const loadScript = require('load-script');
const loadStyle = require('load-style');
const qs = require('qs');

domready(() => {
  Array.from(document.querySelectorAll('a[href*="?soundcite"]')).forEach((a) => {
    const params = qs.parse(a.search.substr(1));
    if (!params['data-id']) return;

    const newNode = document.createElement('span');
    newNode.innerHTML = a.innerHTML;
    newNode.className = 'soundcite';
    Object.keys(params).forEach((key) => {
      newNode.dataset[key.replace('data-', '')] = params[key];
    });
    a.parentNode.replaceChild(newNode, a);
  });

  loadScript('https://cdn.knightlab.com/libs/soundcite/latest/js/soundcite.min.js');
  loadStyle('https://cdn.knightlab.com/libs/soundcite/latest/css/player.css');
});
