/*global
    WordsGenerator
*/

(function () {
  'use strict';

  var
    wordListEl    = document.getElementById('word-list'),
    newWordListEl = document.getElementById('new-word-list'),
    wordGenerator = new WordsGenerator(),
    wordListText,
    wordList,
    newWordList,
    generate;


  generate = function () {
    wordListText  = wordListEl.value;
    wordList      = wordListText.split(/\s+/);
    newWordList   = wordGenerator.generate(wordList);
    newWordListEl
      .innerHTML  = newWordList.join('\n');
  };


  wordListEl.addEventListener('keyup', generate);
  wordListEl.focus();
  generate();

}());
