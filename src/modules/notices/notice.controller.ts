import { Request, Response } from 'express';
import {
  createNotice,
  deleteNotice,
  getAllNotices,
  getSingleNotice,
  updateNotice,
} from './notice.service';

export const createController = async (req: Request, res: Response) => {
  const details = req.body;
  const result = await createNotice(details);
  res.status(201).json({
    success: true,
    data: result,
  });
};

export const getAllController = async (req: Request, res: Response) => {
 try {
    // Parse query params from URL
    const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

    // Validate inputs
    if (page < 1) throw new Error('Page must be >= 1');
    if (limit < 1 || limit > 100) throw new Error('Limit must be between 1-100');

    const { notices, total } = await getAllNotices(page, limit);

    return res.status(200).json(
      {
        success: true,
        data: notices,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit,
        },
      }
    );
  } catch (error: any) {
    return res.status(500).json(
      { success: false, error: error.message || 'Failed to fetch notices' },
    );
  }
};

export const getOneController = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await getSingleNotice(id);
  res.status(200).json({ success: true, data: result });
};

export const updateController = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const details = req.body;
  const result = await updateNotice(id, details);
  res.status(200).json({ success: true, data: result });
};

export const removeController = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await deleteNotice(id);
  res.status(200).json({ success: true, message: 'Deleted Notice' });
};
