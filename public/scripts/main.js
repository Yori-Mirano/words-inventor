/*global
    WordsInventor, Utils, requestAnimationFrame
*/

(function () {
  'use strict';

  var
    wordListEl    = document.getElementById('word-list'),
    newWordListEl = document.getElementById('new-word-list'),
    mainButtonEl  = document.getElementById('main-button'),
    wordsInventor = new WordsInventor(),
    wordListText, oldWordListText,
    wordList,
    newWordList,
    invent;


  invent = function () {
    wordListText = wordListEl.value;

    if (wordListText !== oldWordListText) {
      oldWordListText = wordListText;
      localStorage.wordListText = wordListText;
    }

    newWordList             = wordsInventor.invent(wordListText);
    newWordListEl.innerHTML = newWordList.join('\n');

    requestAnimationFrame(function () {
      Utils.scrollToEnd(newWordListEl, 0.2);
    });
  };


  wordListEl.addEventListener('keyup', invent);
  mainButtonEl.addEventListener('click', invent);
  Utils.applyHorizontalScrolling(newWordListEl);



  if (localStorage.wordListText) {
    wordListEl.value = localStorage.wordListText;
    Utils.focusAtEnd(wordListEl);
    invent();

  } else {
    var client = new XMLHttpRequest();
    client.open('GET', 'data/example.txt');
    client.onreadystatechange = function() {
      if (client.readyState === 4){
        wordListEl.value = client.responseText;
        Utils.focusAtEnd(wordListEl);
        invent();
      }
    }
    client.send();
  }

}());
