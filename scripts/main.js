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


  if (localStorage.wordListText) {
    wordListEl.value = localStorage.wordListText;
  }



  invent = function () {
    wordListText  = wordListEl.value;

    if (wordListText !== oldWordListText) {
      oldWordListText = wordListText;
      wordList        = wordListText.split(/[\s,.;"'*\-+=&²0-1(){}\[\]]+/);
      wordsInventor.analyse(wordList);
      localStorage.wordListText = wordListText;
    }

    newWordList   = wordsInventor.invent();
    newWordListEl
      .innerHTML  = newWordList.join('\n');

    requestAnimationFrame(function () {
      Utils.scrollToEnd(newWordListEl, 0.2);
    });
  };



  wordListEl.addEventListener('keyup', invent);
  mainButtonEl.addEventListener('click', invent);
  invent();

  Utils.applyHorizontalScrolling(newWordListEl);

  Utils.focusAtEnd(wordListEl);

}());
