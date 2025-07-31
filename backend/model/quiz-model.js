import mongoose, { Schema, SchemaTypes } from "mongoose";

// Subdocument schema for a single question
const questionSchema = new Schema({
  question: { type: SchemaTypes.String, required: true, trim: true },
  option1: { type: SchemaTypes.String, required: true, trim: true },
  option2: { type: SchemaTypes.String, required: true, trim: true },
  option3: { type: SchemaTypes.String, required: true, trim: true },
  option4: { type: SchemaTypes.String, required: true, trim: true },
  correctAnswer: {
    type: SchemaTypes.String,
    required: true,
    enum: ["option1", "option2", "option3", "option4"],
    trim: true
  }
}, { _id: false });

function arrayLimit(val) {
  return Array.isArray(val) && val.length > 0;
}

const quizSchema = new Schema({
  title: { type: SchemaTypes.String, required: true, trim: true },
  questions: {
    type: [questionSchema],
    required: true,
    validate: [arrayLimit, "Quiz must have at least one question"]
  }
}, { timestamps: true });

export const quizModel = mongoose.model("quizzes", quizSchema);
