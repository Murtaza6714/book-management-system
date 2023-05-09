import { checkInputError } from "../../Utils";
import { librarianService } from "../../Service";
import { NextFunction, Response } from "express";
import { SuccessInterface } from "../../Service/shared/Services";
// deepcode ignore NoRateLimitingForExpensiveWebOperation: <please specify a reason of ignoring this>
export const profile = async (req: any, res: Response, next: NextFunction) => {
  try {
    // checkInputError(req);
    // const response = await userAttendance.markAttendance(req.body);
    // return res.status(response.statusCode).json(response);
    return res.render('librarian/profile')
  } catch (error) {
    next(error);
  }
};

export const getReturnBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    // checkInputError(req);
    const response = await librarianService.getReturnBook(req.body);
    // return res.status(response.statusCode).json(response);
    return res.render('librarian/profile')
  } catch (error) {
    next(error);
  }
};