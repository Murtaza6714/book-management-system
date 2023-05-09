import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

const BorrowBookSchema = new Schema(
    {
      memberId: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      bookId: {
        type: Schema.Types.ObjectId,
        ref: "book"
      },
      bookCondition: {
        type: String,
      },
      borrowedAt: {
        type: String,
      },
      returnedAt: {
        type: String,
      },
      status: {
        type: String,
        enum: ["BORROWED", "RETURNED"]
      },
    }, {
      timestamps: true
    }
  );

export const borrowBookModel = mongoose.model("borrow_book", BorrowBookSchema);
