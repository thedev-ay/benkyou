import Unsplash from 'unsplash-js';
import { toJson } from 'unsplash-js';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_COLLECTION_ID = process.env.UNSPLASH_MY_COLLECTION_ID;

const unsplash = new Unsplash({ accessKey: UNSPLASH_ACCESS_KEY });

const getPhoto = async (req, res, next) => {
  console.log('Requesting photo from Unsplash');

  const photo = await unsplash.photos
    .getRandomPhoto({ collections: [UNSPLASH_COLLECTION_ID] })
    .then(toJson)
    .then((json) => json);

  console.log('Photo received', photo);
  res.send({ photo });
};

export default getPhoto;
