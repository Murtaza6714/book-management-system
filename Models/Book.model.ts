import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        // required: true,
      },
      isbn: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["AVAILABLE", "BORROWED"],
        default: "AVAILABLE",
      },
    },{
      timestamps: true
    }
  );

export const bookModel = mongoose.model("book", BookSchema);
