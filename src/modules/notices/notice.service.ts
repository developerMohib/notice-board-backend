import { Notice } from './notice.model';

export const createNotice = (payload: any) => {
  return Notice.create(payload);
};

export const getAllNotices = () => {
  return Notice.find().sort({ createdAt: -1 });
};

export const getSingleNotice = (id: string) => {
  return Notice.findById(id);
};

export const updateNotice = (id: string, payload: any) => {
  return Notice.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteNotice = (id: string) => {
  return Notice.findByIdAndDelete(id);
};
