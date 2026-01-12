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
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 5));
    const { status, department, search } = req.query;
    const filter: any = {};

    const cleanString = (val: any): string | null => {
      if (typeof val !== 'string') return null;
      if (val === 'undefined' || val === '') return null;
      return val;
    };

    const statusClean = cleanString(status);
    const departmentClean = cleanString(department);
    const searchClean = cleanString(search);

    if (
      statusClean &&
      ['published', 'draft', 'unpublished'].includes(statusClean)
    ) {
      filter.status = statusClean;
    }

    if (departmentClean) {
      filter.department = departmentClean;
    }

    if (searchClean) {
      filter.$or = [
        { title: { $regex: searchClean, $options: 'i' } },
        { description: { $regex: searchClean, $options: '.i' } },
      ];
    }

    const { notices, total } = await getAllNotices(page, limit, filter);

    return res.status(200).json({
      success: true,
      data: notices,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        perpageproducts: notices.length,
        // filters for frontend
        filters: { status, department, search: search || undefined },
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch notices',
    });
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
  res.status(200).json({
    success: true,
    message: 'Notice updated successfully',
    data: result,
  });
};

export const removeController = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await deleteNotice(id);
  res.status(200).json({ success: true, message: 'Deleted Notice' });
};
