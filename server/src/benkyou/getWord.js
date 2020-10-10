import words from '../../data/words.json';
import shuffle, { pick } from 'shuffle-array';

const getWord = (req, res, next) => {
    console.log('Retrieving random word and choices');
  
    const randomWord = pick(words);
    const randomTranslations = pick(
      words.filter((word) => word != randomWord)
        .map((word) => word.translation),
      { picks: 3 }
    );
  
    randomTranslations.push(randomWord.translation);
  
    const result = { word: randomWord.word, choices: shuffle(randomTranslations) };
  
    console.log('Random word and choices', result);
    res.send(result);
};

export default getWord;