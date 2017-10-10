/*global
    WordsInventor
*/

(function () {
  'use strict';

  var
    wordListEl    = document.getElementById('word-list'),
    newWordListEl = document.getElementById('new-word-list'),
    wordsInventor = new WordsInventor(),
    wordListText,
    wordList,
    newWordList,
    invent,
    focusAtEnd;


  invent = function () {
    wordListText  = wordListEl.value;
    wordList      = wordListText.split(/[\s,]+/);
    newWordList   = wordsInventor.invent(wordList);
    newWordListEl
      .innerHTML  = newWordList.join('\n');

    console.log(wordList);
    console.log(newWordList);
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
