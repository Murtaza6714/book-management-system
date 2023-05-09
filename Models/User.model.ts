import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["LIBRARIAN", "MEMBER"],
      },
    },
    {
      timestamps: true
    }
  );

export const userModel = mongoose.model("user", UserSchema);
