import { checkInputError } from "../../Utils";
import { userAttendance } from "../../Service";
import { NextFunction, Response } from "express";
import { SuccessInterface } from "../../Service/shared/Services";
// deepcode ignore NoRateLimitingForExpensiveWebOperation: <please specify a reason of ignoring this>
export const getLibrarianLogin = async (req: any, res: Response, next: NextFunction) => {
  try {
    // return res.status(response.statusCode).json(response);
    return res.render('auth/login', { userRole: "librarian" })
  } catch (error) {
    next(error);
  }
};

export const getMemberLogin = async (req: any, res: Response, next: NextFunction) => {
    try {
      // return res.status(response.statusCode).json(response);
      return res.render('auth/login', { userRole: "member" })
    } catch (error) {
      next(error);
    }
  };
