import { Request, Response } from 'express';
import {
  createNotice,
  deleteNotice,
  getAllNotices,
  getSingleNotice,
  updateNotice,
} from './notice.service';

export const create = async (req: Request, res: Response) => {
  const details = req.body;
  const result = await createNotice(details);
  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAll = async (_req: Request, res: Response) => {
  const result = await getAllNotices();
  res.status(200).json({
    success: true,
    data: result,
  });
};

export const getOne = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await getSingleNotice(id);
  res.status(200).json({ success: true, data: result });
};

export const update = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const details = req.body;
  const result = await updateNotice(id, details);
  res.status(200).json({ success: true, data: result });
};

export const remove = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await deleteNotice(id);
  res.status(200).json({ success: true, message: 'Deleted' });
};
