import { Router } from 'express';
import { create, getAll, getOne, remove, update } from './notice.controller';

const router = Router();

router.post('/create', create);
router.get('/get-all', getAll);
router.get('/details/:id', getOne);
router.patch('/update/:id', update);
router.delete('/delete/:id', remove);

export const noticeRouter = router;
