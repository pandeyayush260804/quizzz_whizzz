import mongoose, { Schema, SchemaTypes } from "mongoose";

const userSchema = new Schema({
  email: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: SchemaTypes.String,
    required: true,
    minLength: 6
  },
  name: {
    type: SchemaTypes.String,
    required: true,
    minLength: 3
  },
  role: {
    type: SchemaTypes.String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  status: {
    type: SchemaTypes.String,
    default: 'A'
  },
  regdate: {
    type: SchemaTypes.Date,
    default: Date.now
  }
});

export const userModel = mongoose.model('users', userSchema);
