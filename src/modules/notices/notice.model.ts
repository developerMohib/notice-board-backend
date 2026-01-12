import { Schema, model } from 'mongoose';

const noticeSchema = new Schema(
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
        'individual',
        'all department',
        'finance',
        'hr',
        'sales team',
        'web team',
        'database team',
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
  { timestamps: true },
);

export const Notice = model('Notice', noticeSchema);
