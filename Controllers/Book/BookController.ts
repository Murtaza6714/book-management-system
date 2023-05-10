import { checkInputError } from "../../Utils";
import { bookService, userAttendance } from "../../Service";
import { NextFunction, Response } from "express";
import { SuccessInterface } from "../../Service/shared/Services";
import { userModel } from "../../Models";

export const getAddBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    // checkInputError(req);
    // return res.status(response.statusCode).json(response);
    return res.render('book/add-book', {
      oldData: {
        bookTitle: "",
        bookAuthor: "",
        bookIsbn: "",
        bookDescription: "",
      },
      error: false, errorMessage: ""
    })
  } catch (error) {
    next(error);
  }
};

export const postAddBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    // checkInputError(req);
    console.log(req.body);

    const response: Partial<SuccessInterface> = await bookService.addBook(req.body);
    if (response.status === "error") {
      return res.render('book/add-book', {
        oldData: {
          bookTitle: req.body.bookTitle,
          bookAuthor: req.body.bookAuthor,
          bookIsbn: req.body.bookIsbn,
          bookDescription: req.body.bookDescription,
        },
        error: true, errorMessage: response.message
      })
    }

    // return res.status(response.statusCode).json(response);
    return res.redirect('/member-login')
  } catch (error) {
    next(error);
  }
};

export const getBookBySearchTerm = async (req: any, res: Response, next: NextFunction) => {
  try {
    // checkInputError(req);
    const response = await userAttendance.markAttendance(req.body);
    // return res.status(response.statusCode).json(response);
    return res.render('librarian/profile')
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req: any, res: Response, next: NextFunction) => {
  try {
    // checkInputError(req);
    const bookId = req.params.bookId;
    const response = await bookService.getBookById(bookId);
    // return res.status(response.statusCode).json(response);
    return res.render('librarian/profile')
  } catch (error) {
    next(error);
  }
};


export const getAllBooks = async (req: any, res: Response, next: NextFunction) => {
  try {
    // checkInputError(req);
      const response = await bookService.getAllBooks();
    // return res.status(response.statusCode).json(response);
    return res.render('book/books', {
      booksData: response.data,
      error: false,
      errorMessage: ""
    })
  } catch (error) {
    next(error);
  }
};

export const getEditBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    // checkInputError(req);
    const response = await bookService.getEditBook(req.query.bookId)
    // return res.status(response.statusCode).json(response);
    return res.render('book/edit-book', {
      bookData: response.data,
      error: false,
      errorMessage: ""
    })
  } catch (error) {
    next(error);
  }
};

export const postEditBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    // checkInputError(req);
    const response = await bookService.postEditBook(req.body)
    // return res.status(response.statusCode).json(response);
    return res.redirect('book/books')
  } catch (error) {
    next(error);
  }
};

export const deleteBookById = async (req: any, res: Response, next: NextFunction) => {
  try {
    // checkInputError(req);
    const response = await bookService.deleteBookById(req.query.bookId);
    // return res.status(response.statusCode).json(response);
    return res.render('member/members', {
      membersData: response.data,
      error: response.status === "error", 
      errorMessage: response.status === "error"? response.message: "",
      successMessage: response.message
    })
  } catch (error) {
    next(error);
  }
};