import Services from "../shared/Services"
import { errorMessage, httpStatusCode } from "../../Config"
import mongoose from "mongoose";
// import  { productModel } = require("../../Models"); 
import { logger } from '../../Utils'
import { userModel } from "../../Models/User.model";
import { borrowBookModel, bookModel } from "../../Models";
const ObjectId = mongoose.Types.ObjectId

class MemberService extends Services {
  getEditBook(memberId: any) {
    throw new Error("Method not implemented.");
  }
  async addMember(params: any) {
    try {
      logger.info('Add Book started for ');
      const newId = new mongoose.Types.ObjectId();
      
      const memberExists = await userModel.findOne({username: params.username, role: "MEMBER"});
      if (memberExists) return this.success({status: "error", message: "member already exists"})
      const memberSaved =  await userModel.findByIdAndUpdate(newId, params, { new: true, upsert: true })
      
      logger.info('Add member completed for %d');
      return this.success({ statusCode: 201, message: "Member Added Successfully!!" });
    } catch (error) {
      logger.error(`Add Member failed for Error ${error}`);
      throw (error)
    }
  }

  async getEditMember(memberId: string) {
    try {
      logger.info('Get Edit Member started for ');
      
      const memberExists = await userModel.findOne({_id: new ObjectId(memberId), role: "MEMBER"}).lean();
      logger.info('Get Edit Member completed for %d');
      return this.success({ statusCode: 200, message: "Member Fetched Successfully!!", data: memberExists });
    } catch (error) {
      logger.error(`Get Edit Member failed for Error ${error}`);
      throw (error)
    }
  }

  async postEditMember(memberData: any) {
    try {
      logger.info('Post Edit Member started for ');
      
      const memberExists = await userModel.findByIdAndUpdate(memberData.memberId, memberData, { new: true }).lean();
      const members = await userModel.find({role: "MEMBER"}).lean()
      logger.info('Post Edit Member completed for %d');
      return this.success({ statusCode: 200, message: "Member Updated Successfully!!", data: members });
    } catch (error) {
      logger.error(`Add Book failed for Error ${error}`);
      throw (error)
    }
  }

  async getAllMembers() {
    try {
      logger.info('Get All Members started for ');
      
      const members = await userModel.find({role: "MEMBER"}).lean();
      logger.info('Get All Members completed for %d');
      return this.success({ statusCode: 200, message: "Member Fetched Successfully!!", data: members });
    } catch (error) {
      logger.error(`Add Book failed for Error ${error}`);
      throw (error)
    }
  }

  async getBorrowedBooks(memberId: string) {
    try {
      logger.info('Get Borrowed Books started for ');
      
      const borrowedBooks = await borrowBookModel.aggregate([{
        $match: {
            memberId: new ObjectId(memberId),
            role: "BORROWED"
        }
      },{
        $lookup:
           {
              from: "book",
              let: { bookId: "$bookId" },
              pipeline: [ {
                $match: {$expr: { $eq: ['$_id', '$$bookId'] }},
                $project: { status: 0 }
              } ],
              as: "bookData"
           }
     },{
        $set: { bookData: { $first: "$bookData" } }
     },{
        $project: {
            status: 0
        }
     }])
      logger.info('Get Borrowed books completed for %d');
      return this.success({ statusCode: 200, message: "Borrowed books by member fetched Successfully!!", data: borrowedBooks });
    } catch (error) {
      logger.error(`Add Book failed for Error ${error}`);
      throw (error)
    }
  }

  async borrowBook(bookId: any, memberId: string) {
    try {
      logger.info('Borrow Book started for %s', bookId);
      const newId = new ObjectId();
      const book = await bookModel.findById(bookId).lean();
      if(book?.status === "BORROWED") {
        const books = await bookModel.find({ isDeleted: false }).lean();
        return this.success({status: "error", message: "Book is already Borrowed", data: books});
       }
      const bookBorrow = await borrowBookModel.findByIdAndUpdate(newId, { memberId: new ObjectId(memberId), bookId: new ObjectId() }, {new: true, upsert: true}).lean()
      const books = await bookModel.find({ isDeleted: false }).lean();
      
      logger.info('Borrow Book By Id completed for %s', bookId);
      return this.success({ statusCode: 200, message: "Book Borrowed Successfully!!", data: books });
    } catch (error) {
      logger.error(`Borrow Book failed for Error ${error}`);
      throw (error)
    }
  }

  async deleteMemberById(memberId: string) {
    try {
      logger.info('Get All Members started for ');
      
      const memberDeleted = await userModel.findByIdAndDelete(memberId).lean();
      const members = await userModel.find({role: "MEMBER"}).lean();
      if (!memberDeleted) return this.success({status: "error", message: "Member Not Deleted", data: members});
      logger.info('Get All Members completed for %d');
      return this.success({ statusCode: 200, message: "Member Fetched Successfully!!", });
    } catch (error) {
      logger.error(`Add Book failed for Error ${error}`);
      throw (error)
    }
  }

}

export const memberService = new MemberService
