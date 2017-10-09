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
    generate;


  generate = function () {
    wordListText  = wordListEl.value;
    wordList      = wordListText.split(/\s+/);
    newWordList   = wordsInventor.invent(wordList);
    newWordListEl
      .innerHTML  = newWordList.join('\n');
  };


  wordListEl.addEventListener('keyup', generate);
  wordListEl.focus();
  generate();

}());
