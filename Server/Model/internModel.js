import mongoose from 'mongoose';

const internSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  performance: String,
  p_number: String,
  email: String,
  offerLetterPath: String,
  certificatePath: String,
  lorPath: String,
}, { timestamps: true });

export const Intern = mongoose.model('interndatas', internSchema, "interndatas");
