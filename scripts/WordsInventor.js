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
    this.oldWordList  = null;
    this.wordList     = wordList || [];
    this.analysis     = {};
    this.invented     = [];

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

    var
      wordListAnalysis = {},
      word, wordIndex, wordListLength,
      charIndex, wordLength,
      charCode, i, j, k;

    toLowerCaseAll(this.wordList);
    wordList = this.wordList = filterUniqueItems(this.wordList);

    for (wordIndex = 0, wordListLength = wordList.length; wordIndex < wordListLength; wordIndex += 1) {
      word = wordList[wordIndex];
      i = 0;
      j = 0;
      k = 0;

      for (charIndex = 0, wordLength = word.length; charIndex <= wordLength; charIndex += 1) {
        if (charIndex < wordLength) {
          charCode = word.charCodeAt(charIndex);
        } else {
          charCode = 0;
        }

        j = k;
        k = charCode;

        if (typeof wordListAnalysis[i] === 'undefined') {
          wordListAnalysis[i] = {};
        }

        if (typeof wordListAnalysis[i][j] === 'undefined') {
          wordListAnalysis[i][j] = {};
        }

        if (typeof wordListAnalysis[i][j][k] === 'undefined') {
          wordListAnalysis[i][j][k] = 0;
        }

        wordListAnalysis[i][j][k] += 1;
        i = j;
        j = k;
      }
    }

    this.analysis = normalize(wordListAnalysis);
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

    if (this.wordList !== this.oldWordList) {
      this.invented = [];
      this.oldWordList = this.wordList;
    }

    var
      analysis    = this.analysis,
      wordNumber  = 250,
      wordLength  = 10,
      newWordList = this.invented,
      uniqueNewWordList = [],
      newWord, nextChar, rnd, charWeight,
      charPosition, i, j;


    while (wordNumber >= 0) {
      newWord = '';
      nextChar = 0;
      i = 0;
      j = 0;

      for (charPosition = 0; charPosition < wordLength; charPosition += 1) {
        rnd = Math.random();

        if (!analysis[nextChar] || !analysis[nextChar][i]) {
          break;
        }

        for (j in  analysis[nextChar][i]) {
          charWeight = analysis[nextChar][i][j];
          rnd -= charWeight;
          if (rnd <= 0) {
            break;
          }
        }

        if (j != 0) {
          newWord += String.fromCharCode(j);
        }

        nextChar = i;
        i = j;
      }

      if (newWord.length < wordLength) {
        newWordList.push(newWord);
        wordNumber -= 1;
      } else {
        continue;
      }
    }

    uniqueNewWordList = filterUniqueItems(newWordList);
    this.invented     = filterNewItems(wordList, uniqueNewWordList);

    return this.invented;
  };




  /**
   * [[Description]]
   */
  normalize = function (analysis) {
    var
      sum, veryLeftChar, leftChar,
      i, j, k;


    for (i in analysis) {
      veryLeftChar = analysis[i];

      for (j in veryLeftChar) {
        leftChar = veryLeftChar[j];
        sum = 0;

        for (k in leftChar) {
          sum += veryLeftChar[j][k];
        }

        for (k in leftChar) {
          veryLeftChar[j][k] /= sum;
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
