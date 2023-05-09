import Services from "../shared/Services"
import { errorMessage, httpStatusCode } from "../../Config"
import mongoose from "mongoose";
// import  { productModel } = require("../../Models"); 
import { logger } from '../../Utils'
import { bookModel } from "../../Models/Book.model";

class BookService extends Services {
  async addBook(params: any) {
    try {
      logger.info('Add Book started for ');
      const newId = new mongoose.Types.ObjectId();
      const bookData = {
        title: params.bookTitle,
        author: params.bookAuthor,
        description: params.bookDescription,
        isbn: params.bookIsbn
      }
      const bookExists = await bookModel.findOne({isbn: bookData.isbn});
      if (bookExists) return this.success({status: "error", message: "Book already exists"})
      const bookSaved =  await bookModel.findByIdAndUpdate(newId, bookData, { new: true, upsert: true })
      
      logger.info('Add Book completed for %d');
      return this.success({ statusCode: 201, message: "Book Added Successfully!!" });
    } catch (error) {
      logger.error(`Add Book failed for Error ${error}`);
      throw (error)
    }
  }

  async getEditBook(bookId: string) {
    try {
      logger.info('Get Edit Book started for ');
      
      const bookExists = await bookModel.findById(bookId).lean();
      logger.info('Get Edit Book completed for %d');
      return this.success({ statusCode: 200, message: "Book Added Successfully!!", data: bookExists });
    } catch (error) {
      logger.error(`Add Book failed for Error ${error}`);
      throw (error)
    }
  }

  async postEditBook(bookData: any) {
    try {
      logger.info('Post Edit Book started for ');
      const updatedBookData = {
        title: bookData.bookTitle,
        author: bookData.bookAuthor,
        description: bookData.bookDescription,
        isbn: bookData.bookIsbn
      }
      const bookExists = await bookModel.findByIdAndUpdate(bookData.bookId,updatedBookData, { new: true }).lean();
      logger.info('Post Edit Book completed for %d');
      return this.success({ statusCode: 200, message: "Book Added Successfully!!", data: bookExists });
    } catch (error) {
      logger.error(`Add Book failed for Error ${error}`);
      throw (error)
    }
  }

  async getBookById(bookId: any) {
    try {
      logger.info('Get Book By Id started for ');
      const book = await bookModel.findById(bookId).lean();
      logger.info('Get Book By Id completed for %d');
      return this.success({ statusCode: 200, message: "Book Data Feteched Successfully!!", data: book });
    } catch (error) {
      logger.error(`Add Book failed for Error ${error}`);
      throw (error)
    }
  }

}

export const bookService = new BookService
