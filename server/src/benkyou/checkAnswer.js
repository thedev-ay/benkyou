import words from '../../data/words.json';

const checkAnswer = (req, res, next) => {
  const japaneseWord = req.query.word;
  const answer = req.query.answer;

  console.log('Checking answer', { word: japaneseWord, answer });

  if (!japaneseWord && !answer)
    return res.sendStatus(400);

  const checkAnswer = data => data.word === japaneseWord && data.translation === answer;
  const search = words.filter(checkAnswer);
  const result = { result: search.length > 0 };

  console.log('Result', result);
  res.send(result);
};

export default checkAnswer;
