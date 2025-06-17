import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin {
  name: string;
  email: string;
}

export interface AdminDocument extends Document, IAdmin {
  id: string; // The virtual field 'id'
}

const AdminSchema = new Schema<AdminDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

AdminSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const AdminModel = mongoose.model<AdminDocument>('Admin', AdminSchema);

export default AdminModel;

