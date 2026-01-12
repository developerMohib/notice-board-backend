import { connectDB } from '../../db/db';
import { Notice } from './notice.model';

export const createNotice = async (payload: any) => {
  await connectDB();
  return Notice.create(payload);
};

export const getAllNotices = async (page: number, limit: number) => {
  await connectDB();
  
  const skip = (page - 1) * limit;
  // return Notice.find().sort({ createdAt: -1 });
    const [notices, total] = await Promise.all([
    Notice.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Notice.countDocuments(),
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
