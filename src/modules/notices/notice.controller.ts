import { Request, Response } from 'express';
import {
  createNotice,
  deleteNotice,
  getAllNotices,
  getAllNoticesPage,
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

export const getAllControllerPage = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 5));
    const { status, department, search } = req.query;
    const filter: any = {};
    console.log(
      'page:',
      page,
      'limit:',
      limit,
      'status:',
      status,
      'department:',
      department,
      'search:',
      search,
    );
    if (
      status &&
      ['published', 'draft', 'unpublished'].includes(status as string)
    ) {
      filter.status = status;
    }

    if (department && typeof department === 'string') {
      filter.department = department;
    }

    if (search && typeof search === 'string') {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const { notices, total } = await getAllNoticesPage(page, limit, filter);

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

export const getAllController = async (req: Request, res: Response) => {
  const result = await getAllNotices();
  res.status(200).json({ success: true, data: result });
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
