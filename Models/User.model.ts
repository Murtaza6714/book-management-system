import * as mongoose from 'mongoose'
import * as jwt from 'jsonwebtoken'
import Config from "../Config"

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
      isDeleted: {
        type: Boolean,
        default: false,
      }
    },
    {
      timestamps: true
    }
  );

  UserSchema.methods.generateLoginToken = function () {
    const signedToken = jwt.sign({ _id: this._id, email: this.email}, Config.jwtOption.secret, {
      expiresIn: Config.jwtOption.expiresIn,
    });
    return signedToken;
  };
  

export const userModel = mongoose.model("user", UserSchema);
