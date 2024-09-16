import mongoose from 'mongoose';

const internSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Intern = mongoose.model('interndatas', internSchema);
