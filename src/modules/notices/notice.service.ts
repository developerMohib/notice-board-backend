import { connectDB } from '../../db/db';
import { Notice } from './notice.model';

export const createNotice = async (payload: any) => {
  await connectDB();
  return Notice.create(payload);
};

export const getAllNotices = async (
  page: number,
  limit: number,
  filter: any = {}
) => {
  await connectDB();

  const skip = (page - 1) * limit;

  const [notices, total] = await Promise.all([
    Notice.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Notice.countDocuments(filter),
  ]);

  return { notices, total };
};

export const getSingleNotice = async (id: string) => {
  await connectDB();
  return Notice.findById(id);
};

export const updateNotice = async (id: string, payload: any) => {
  await connectDB();
  return Notice.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteNotice = async (id: string) => {
  await connectDB();
  return Notice.findByIdAndDelete(id);
};

export const getNoticesByStatus = async (status: string) => {
  return await Notice.find({ status }).sort({ createdAt: -1 });
};

// Specific exports (optional but clean)
export const getPublishedNotices = () => getNoticesByStatus('published');
export const getDraftNotices = () => getNoticesByStatus('draft');
export const getUnpublishedNotices = () => getNoticesByStatus('unpublished');
