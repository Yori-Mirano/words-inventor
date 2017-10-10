/*global
    WordsInventor
*/

(function () {
  'use strict';

  var
    wordListEl    = document.getElementById('word-list'),
    newWordListEl = document.getElementById('new-word-list'),
    wordsInventor = new WordsInventor(),
    wordListText, oldWordListText,
    wordList,
    newWordList,
    invent,
    focusAtEnd;

  if (localStorage.wordListText) {
    wordListEl.value = localStorage.wordListText;
  }

  invent = function () {
    wordListText  = wordListEl.value;

    if (wordListText != oldWordListText) {
      oldWordListText = wordListText;
      wordList        = wordListText.split(/[\s,.;"'*\-+=&²0-1(){}[\]]+/);
      wordsInventor.analyse(wordList);
      localStorage.wordListText = wordListText;
    }

    newWordList   = wordsInventor.invent();
    newWordListEl
      .innerHTML  = newWordList.join('\n');

    newWordListEl.scrollLeft = newWordListEl.scrollWidth;
  };


  focusAtEnd = function (inputEl) {
    inputEl.focus();
    var value     = inputEl.value;
    inputEl.value = '';
    inputEl.value = value;
  };


  wordListEl.addEventListener('keyup', invent);
  invent();

  focusAtEnd(wordListEl);

}());
