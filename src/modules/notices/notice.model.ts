import { Schema, model, Document } from 'mongoose';

// ✅ Define TypeScript Interface
export interface IAttachment {
  filename?: string;
  originalName?: string;
  size?: number;
  mimetype?: string;
  path?: string;
}

export interface INotice extends Document {
  title: string;
  description: string;
  noticeType:
    | 'Warning Desiplaine'
    | 'Appreciation & Recognition'
    | 'Attendance Leave Issue'
    | 'Pay Roll Compensation'
    | 'Contract Role Update'
    | 'Advisory Personal Reminder';
  department:
    | 'all'
    | 'individual'
    | 'finance'
    | 'hr'
    | 'sales'
    | 'web'
    | 'database'
    | 'admin';
  attachments?: IAttachment[];
  employeeId?: string;
  employeeName?: string;
  position?: string;
  status: 'published' | 'unpublished' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const noticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    noticeType: {
      type: String,
      enum: [
        'Warning Desiplaine',
        'Appreciation & Recognition',
        'Attendance Leave Issue',
        'Pay Roll Compensation',
        'Contract Role Update',
        'Advisory Personal Reminder',
      ],
      required: true,
    },
    department: {
      type: String,
      enum: [
        'all',
        'individual',
        'finance',
        'hr',
        'sales',
        'web',
        'database',
        'admin',
      ],
      required: true,
    },
    attachments: [
      {
        filename: { type: String },
        originalName: { type: String },
        size: { type: Number },
        mimetype: { type: String },
        path: { type: String },
      },
    ],
    employeeId: { type: String },
    employeeName: { type: String },
    position: { type: String },
    status: {
      type: String,
      enum: ['published', 'unpublished', 'draft'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

// ✅ Add indexes for performance
noticeSchema.index({ status: 1 });
noticeSchema.index({ department: 1 });
noticeSchema.index({ title: 'text', description: 'text' });
noticeSchema.index({ status: 1, department: 1 }); // Compound index

// ✅ Export model with proper typing
export const Notice = model<INotice>('Notice', noticeSchema);

export default Notice;