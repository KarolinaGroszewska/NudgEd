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

// Create a virtual 'id' field that returns _id as a string
AdminSchema.virtual('id').get(function (this: AdminDocument) { // Type the 'this' context here
  return (this._id as mongoose.Types.ObjectId).toHexString();
});

AdminSchema.set('toJSON', {
  virtuals: true, // Ensure virtuals are included in the JSON output
});

const AdminModel = mongoose.model<AdminDocument>('Admin', AdminSchema);

export default AdminModel;

