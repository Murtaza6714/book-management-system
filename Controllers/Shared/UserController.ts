import { checkInputError } from "../../Utils";
import { userAttendance } from "../../Service";
import { NextFunction, Response } from "express";
import { SuccessInterface } from "../../Service/shared/Services";
// deepcode ignore NoRateLimitingForExpensiveWebOperation: <please specify a reason of ignoring this>
export const markAttendance = async (req: any, res: Response, next: NextFunction) => {
  try {
    // checkInputError(req);
    const response = await userAttendance.markAttendance(req.body);
    // return res.status(response.statusCode).json(response);
    return res.render('index')
  } catch (error) {
    next(error);
  }
};
