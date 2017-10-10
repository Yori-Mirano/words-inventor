/*global
    WordsInventor
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
    invent,
    scrollToEnd,
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

    requestAnimationFrame(function () {
      scrollToEnd(newWordListEl, 0.2);
    });
  };



  /**
   * [[Description]]
   * @param {object}   el             [[Description]]
   * @param {[[Type]]} [velocity=0.1] [[Description]]
   */
  scrollToEnd = function (el, velocity) {
    velocity = velocity || 0.1;

    var
      scrollPosition = el.scrollLeft,
      animateScroll;

    animateScroll = function () {
      var
        scrollFrom  = scrollPosition,
        scrollTo    = el.scrollWidth - el.offsetWidth;

      if ((scrollTo - scrollFrom) > 2) {
        requestAnimationFrame(animateScroll);
      }

      scrollPosition = scrollFrom + ((scrollTo - scrollFrom) * velocity);
      el.scrollLeft = scrollPosition;
    };

    animateScroll();
  };



  /**
   * [[Description]]
   * @param {object} inputEl [[Description]]
   */
  focusAtEnd = function (inputEl) {
    inputEl.focus();
    var value     = inputEl.value;
    inputEl.value = '';
    inputEl.value = value;
  };



  wordListEl.addEventListener('keyup', invent);
  mainButtonEl.addEventListener('click', invent);
  invent();

  focusAtEnd(wordListEl);

}());
