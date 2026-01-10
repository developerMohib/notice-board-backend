import { Router } from 'express';
import { createController, getAllController, getOneController, removeController, updateController,  } from './notice.controller';

const router = Router();

router.post('/create', createController);
router.get('/get-all', getAllController);
router.get('/details/:id', getOneController);
router.patch('/update/:id', updateController);
router.delete('/delete/:id', removeController);

export const noticeRouter = router;
