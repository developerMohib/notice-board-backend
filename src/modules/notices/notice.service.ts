import { connectDB } from '../../db/db';
import { INotice, Notice } from './notice.model';
interface NoticeFilter extends Partial<INotice> {
  $or?: Array<{ [key: string]: any }>;
  [key: string]: any;
}
export const createNotice = async (payload: any) => {
  await connectDB();
  return Notice.create(payload);
};


export const getAllNotices = async (
  page: number = 1,
  limit: number = 10,
  filter: NoticeFilter = {}
) => {
  try {
    await connectDB();
 
    const validPage = Math.max(1, page);
    const validLimit = Math.min(100, Math.max(1, limit));
    const skip = (validPage - 1) * validLimit;
 
    // ✅ Simple typing - no FilterQuery needed
    const mongoFilter = filter as any;
 
    const [notices, total] = await Promise.all([
      Notice.find(mongoFilter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(validLimit)
        .lean() as Promise<INotice[]>,
      Notice.countDocuments(mongoFilter),
    ]);
 
    return { notices, total };
  } catch (error: any) {
    console.error('Error fetching notices:', error);
    throw new Error(`Failed to fetch notices: ${error.message}`);
  }
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
