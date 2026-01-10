import { Schema, model } from 'mongoose';

const noticeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    noticeType: {
      type: String,
      enum: [
        'general',
        'holiday & event',
        'hr & policy update',
        'finance & payroll',
        'it & system maintenance',
        'warning & discipline',
        'emargency & urgent',
      ],
      required: true,
    },
    department: {
      type: String,
      enum: [
        'all department',
        'sales team',
        'finance',
        'web team',
        'database team',
        'admin',
        'individual',
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ['published', 'unpublished', 'draft'],
      default: 'draft',
    },
  },
  { timestamps: true },
);

export const Notice = model('Notice', noticeSchema);
