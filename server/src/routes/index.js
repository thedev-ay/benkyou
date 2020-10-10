import { Router } from 'express';
const router = Router();

import getWord from '../benkyou/getWord';
import checkAnswer from "../benkyou/checkAnswer";
import getPhoto from "../benkyou/getPhoto";

router.get('/', getWord);
router.get('/photo', getPhoto);
router.get('/check', checkAnswer);

export default router;
