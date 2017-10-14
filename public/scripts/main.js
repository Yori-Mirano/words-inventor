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

    newWordList = wordsInventor.invent(wordListText);

    if ((typeof newWordList !== 'undefined') && newWordList.length > 0) {
      mainButtonEl.classList.remove('main-button--disabled');
      newWordListEl.classList.remove('new-word-list--no-result');
      newWordListEl.innerHTML = newWordList.join('\n');
    } else {
      mainButtonEl.classList.add('main-button--disabled');
      newWordListEl.classList.add('new-word-list--no-result');
      newWordListEl.innerHTML = "<i class=\"icon ion-compose\"></i><div>need more words to invent</div><div>(~10 minimum)</div>";
    }


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
