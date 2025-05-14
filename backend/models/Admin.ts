import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
    name: string;
    email: string;
    // extending an authentication token
}

const AdminSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // extending an authentication token
});

const AdminModel = mongoose.model<IAdmin>('Admin', AdminSchema);
export default AdminModel;