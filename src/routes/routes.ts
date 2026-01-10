import { Router } from 'express';
import { noticeRouter } from '../modules/notices/notice.route';

const router = Router();
const modules_Routes = [
  {
    path: '/notice',
    route: noticeRouter,
  },
];

modules_Routes.forEach((route) => router.use(route.path, route.route));

export { router };
