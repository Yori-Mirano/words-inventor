(function () {
  'use strict';



  /**
   * [[Description]]
   * @param {[[Type]]} wordList [[Description]]
   */
  var WordsGenerator = function (wordList) {
    this.wordList = wordList;
    this.analysis = {};
//    this.normalizedWordListAnalysis = {};

    this.analyse(wordList);
  };



  /**
   * [[Description]]
   * @returns {[[Type]]} [[Description]]
   */
  WordsGenerator.prototype.analyse = function () {
    var
      wordList          = this.wordList,
      wordListAnalysis  = {},
      word, wordIndex, wordListLength,
      charIndex, wordLength,
      charCode, i, j;

    for (wordIndex = 0, wordListLength = wordList.length; wordIndex < wordListLength; wordIndex += 1) {
      word = wordList[wordIndex];
      i = 0;
      j = 0;

      for (charIndex = 0, wordLength = word.length; charIndex < wordLength; charIndex += 1) {
        charCode = word.charCodeAt(charIndex);
        j = charCode;

        if (typeof wordListAnalysis[i] === 'undefined') {
          wordListAnalysis[i] = {};
        }

        if (typeof wordListAnalysis[i][j] === 'undefined') {
          wordListAnalysis[i][j] = 0;
        }

        wordListAnalysis[i][j] += 1;
        i = j;
      }
    }

    this.analysis = wordListAnalysis;

    this.normalize();
    return this.analysis;
  };



  /**
   * [[Description]]
   */
  WordsGenerator.prototype.normalize = function () {
    var tab = this.analysis;

    var sum, tab1, tab2;
    var i, j;
    for (i in tab) {
      tab1 = tab[i];
      sum = 0;

      for (j in tab1) {
        sum += tab1[j];
      }

      for (j in tab1) {
        tab1[j] /= sum;
      }
    }
  };



  /**
   * [[Description]]
   */
  WordsGenerator.prototype.generate = function () {
    var
      wordListAnalysis = this.analysis,
      wordNumber = 30,
      wordLength = 6,
      newWordList = [],
      newWord, nextChar, rnd, charWeight,
      i, j;

    while ((wordNumber -= 1) >= 0) {
      newWord = '';
      nextChar = 0;

      for (i = 0; i < wordLength; i += 1) {
        rnd = Math.random();

        if (!wordListAnalysis[nextChar]) {
          break;
        }

        for (j in  wordListAnalysis[nextChar]) {
          charWeight = wordListAnalysis[nextChar][j];
          rnd -= charWeight;
          if (rnd <= 0) {
            nextChar = j;
            break;
          }
        }

        newWord += String.fromCharCode(nextChar);
      }

      newWordList.push(newWord);
    }

    return newWordList;
  };



  window.WordsGenerator = WordsGenerator;
}());
