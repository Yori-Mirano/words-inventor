var wordListEl = document.getElementById('word-list');

var update = function () {
  var wordListText = wordListEl.value;
  var wordList = wordListText.split(/\s+/u);

  var wordGenerator = new WordsGenerator(wordList);
  var newWordList   = wordGenerator.generate();


  var newWordListEl = document.getElementById('new-word-list');
  newWordListEl.innerHTML = newWordList.join('\n');
};

wordListEl.addEventListener('keyup', update);

update();

wordListEl.focus();
