import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from '../types/enums.js';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
  school?: mongoose.Types.ObjectId;
  department?: string;
  programme?: string;
  semester?: number;
  registrationNumber?: string;
  employeeId?: string;
  phone?: string;
  avatarUrl?: string;
  designation?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true },
    roles: [
      {
        type: String,
        enum: Object.values(UserRole),
        default: [UserRole.STUDENT],
      },
    ],
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    department: { type: String, trim: true },
    programme: { type: String, trim: true },
    semester: { type: Number, min: 1, max: 12 },
    registrationNumber: { type: String, trim: true, index: true },
    employeeId: { type: String, trim: true, index: true },
    phone: { type: String, trim: true },
    avatarUrl: { type: String },
    designation: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
