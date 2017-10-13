/*global
    console
*/

(function () {
  'use strict';

  var
    WordsInventor,
    normalize,
    filterUniqueItems,
    filterNewItems,
    toLowerCaseAll;


  /**
   * [[Description]]
   * @param {[[Type]]} wordList [[Description]]
   */
  WordsInventor = function (wordList) {
    this.oldWordList    = null;
    this.wordList       = null;
    this.analysis       = {};
    this.invented       = [];
    this.maxWordLength  = 0;

    this.analyse(wordList);
  };



  /**
   * [[Description]]
   * @returns {[[Type]]} [[Description]]
   */
  WordsInventor.prototype.analyse = function (wordList) {
    if (typeof wordList !== 'undefined') {
      this.wordList = wordList;
    }

    if (this.wordList !== this.oldWordList) {
      this.invented      = [];
      this.oldWordList   = this.wordList;

      if (typeof(this.wordList) === 'string') {
        wordList = this.wordList.split(/[\s,.;"'*+=&0-9(){}\[\]]+/);
      }

      toLowerCaseAll(wordList);
      wordList = filterUniqueItems(wordList);

      this.maxWordLength = 0;

      var
        wordListAnalysis  = {},
        wordListLength    = wordList.length,
        wordIndex, word, wordLength, charIndex,
        veryPreviousChar, previousChar, currentChar;

      for (wordIndex = 0; wordIndex < wordListLength; wordIndex += 1) {
        word              = wordList[wordIndex];
        wordLength        = word.length;
        veryPreviousChar  = 0;
        previousChar      = 0;
        currentChar       = 0;

        if (wordLength > this.maxWordLength) {
          this.maxWordLength = wordLength;
        }

        for (charIndex = 0; charIndex <= wordLength; charIndex += 1) {
          if (charIndex < wordLength) {
            currentChar = word[charIndex];
          } else {
            currentChar = 0;
          }

          if (typeof wordListAnalysis[veryPreviousChar] === 'undefined') {
            wordListAnalysis[veryPreviousChar] = {};
          }

          if (typeof wordListAnalysis[veryPreviousChar][previousChar] === 'undefined') {
            wordListAnalysis[veryPreviousChar][previousChar] = {};
          }

          if (typeof wordListAnalysis[veryPreviousChar][previousChar][currentChar] === 'undefined') {
            wordListAnalysis[veryPreviousChar][previousChar][currentChar] = 0;
          }

          wordListAnalysis[veryPreviousChar][previousChar][currentChar] += 1;
          veryPreviousChar  = previousChar;
          previousChar      = currentChar;
        }
      }

      this.analysis = normalize(wordListAnalysis);
    }

    return this.analysis;
  };



  /**
   * [[Description]]
   */
  WordsInventor.prototype.invent = function (wordList) {
    if (typeof wordList !== 'undefined') {
      this.analyse(wordList);
    } else {
      wordList    = this.wordList;
    }

    var
      attemptCount      = 500,
      analysis          = this.analysis,
      wordLength        = this.maxWordLength,
      newWordList       = this.invented,
      uniqueNewWordList = [],
      charIndex,
      veryPreviousChar, previousChar,
      nextCharList, nextChar,
      seuil, charWeight,
      newWord;


    while (attemptCount >= 0) {
      veryPreviousChar  = 0;
      previousChar      = 0;
      nextChar          = 0;
      newWord           = '';

      for (charIndex = 0; charIndex <= wordLength; charIndex += 1) {
        nextCharList  = analysis[veryPreviousChar][previousChar];
        seuil         = Math.random();

        for (nextChar in  nextCharList) {
          charWeight = nextCharList[nextChar];
          seuil     -= charWeight;
          if (seuil <= 0) { break; }
        }

        if (nextChar === '0') {
          newWordList.push(newWord);
          break;
        }

        veryPreviousChar  = previousChar;
        previousChar      = nextChar;
        newWord          += nextChar;
      }

      attemptCount -= 1;
    }

    uniqueNewWordList = filterUniqueItems(newWordList);
    this.invented     = filterNewItems(this.wordList, uniqueNewWordList);

    return this.invented;
  };




  /**
   * [[Description]]
   */
  normalize = function (analysis) {
    var
      occurrenceSum,    veryPreviousChar,
      previousCharList, previousChar,
      nextCharList,     nextChar;


    for (veryPreviousChar in analysis) {
      previousCharList = analysis[veryPreviousChar];

      for (previousChar in previousCharList) {
        nextCharList = previousCharList[previousChar];
        occurrenceSum = 0;

        for (nextChar in nextCharList) {
          occurrenceSum += nextCharList[nextChar];
        }

        for (nextChar in nextCharList) {
          nextCharList[nextChar] /= occurrenceSum;
        }
      }
    }

    return analysis;
  };



  /**
   * [[Description]]
   * @private
   * @param   {Array} arrayToFilter [[Description]]
   * @returns {Array} [[Description]]
   */
  filterUniqueItems = function (arrayToFilter) {
    var filteredArray = arrayToFilter.filter(function (item, pos) {
      return arrayToFilter.indexOf(item) === pos;
    });

    return filteredArray;
  };


  /**
   * [[Description]]
   * @private
   * @param   {Array} oldArray [[Description]]
   * @param   {Array} newArray [[Description]]
   * @returns {Array} [[Description]]
   */
  filterNewItems = function (oldArray, newArray) {
    var filteredArray = newArray.filter(function (item, pos) {
      return oldArray.indexOf(item) === -1;
    });

    return filteredArray;
  };


  /**
   * [[Description]]
   * @private
   * @param {Array} arrayToConvert [[Description]]
   */
  toLowerCaseAll = function (arrayToConvert) {
    var i, l;

    for (i = 0, l = arrayToConvert.length; i < l; i += 1) {
      arrayToConvert[i] = arrayToConvert[i].toLowerCase();
    }
  };



  window.WordsInventor = WordsInventor;
}());
