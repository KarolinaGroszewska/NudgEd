import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  name: string;
  adminId: mongoose.Types.ObjectId;
  studentIds: mongoose.Types.ObjectId[];
  assignmentIds: mongoose.Types.ObjectId[];
}

const classSchema: Schema = new Schema({
  name: { type: String, required: true },
  adminId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  studentIds: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  assignmentIds: [{ type: Schema.Types.ObjectId, ref: 'Assignment', default: [] }]
});

export const ClassModel = mongoose.model<IClass>('Class', classSchema);

