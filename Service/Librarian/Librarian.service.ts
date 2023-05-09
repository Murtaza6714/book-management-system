import Services from "../shared/Services"
import { errorMessage, httpStatusCode } from "../../Config"
import mongoose from "mongoose";
// import  { productModel } = require("../../Models"); 
import { logger } from '../../Utils'
import { bookModel, borrowBookModel, userModel } from "../../Models";


class LibrarianService extends Services {
  async postReturnBook(params: any) {
    try {
      logger.info('Post Return Book started for ');
      const bookData = await bookModel.findOne({ isbn: params.isbn })
      if(!bookData) return this.success({ status: "error", message: "Book not Found!!" })
      const userData = await userModel.findOne({username: params.username, role: "MEMBER"}).lean()
      if(!userData) return this.success({ status: "error", message: "User not Found!!" })
      
      const bookExists = await borrowBookModel.findOneAndUpdate({ bookId: bookData._id, memberId: userData._id }, { 
        bookCondition: params.bookCondition, 
        returnedAt: new Date(), 
        status: "RETURNED"
       })
       bookData.status = "AVAILABLE"
       await bookData.save()
      logger.info(' Post Return Book completed for %d');
      return this.success({ statusCode: 201, message: "Book Returned Successfully!!" });
    } catch (error) {
      logger.error(`Add Book failed for Error ${error}`);
      throw (error)
    }
  }
}

export const librarianService = new LibrarianService
