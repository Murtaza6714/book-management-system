import { checkInputError } from "../../Utils";
import { memberService, userAttendance } from "../../Service";
import { NextFunction, Response } from "express";
import { SuccessInterface } from "../../Service/shared/Services";
import { userModel } from "../../Models/User.model";

export const getAddMember = async (req: any, res: Response, next: NextFunction) => {
    try {
      // checkInputError(req);
      return res.render('member/add-member', {
        oldData: {
          name: "",
          email: "",
          username: "",
          password: "",
          phone: "",
          address: "",
        },
        error: false, errorMessage: ""
      })
    } catch (error) {
      next(error);
    }
  };

export const postAddMember = async (req: any, res: Response, next: NextFunction) => {
    try {
      // checkInputError(req);
      const response = await userAttendance.markAttendance(req.body);
      // return res.status(response.statusCode).json(response);
      return res.render('librarian/profile')
    } catch (error) {
      next(error);
    }
  };
  
  export const getMemberById = async (req: any, res: Response, next: NextFunction) => {
    try {
      // checkInputError(req);
      const response = await userAttendance.markAttendance(req.body);
      // return res.status(response.statusCode).json(response);
      return res.render('librarian/profile')
    } catch (error) {
      next(error);
    }
  };

  export const getEditMember = async (req: any, res: Response, next: NextFunction) => {
    try {
      // checkInputError(req);
      const response = await memberService.getEditMember(req.query.memberId)
      // return res.status(response.statusCode).json(response);
      return res.render('book/edit-book', {
        memberData: response.data,
        error: false,
        errorMessage: ""
      })
    } catch (error) {
      next(error);
    }
  };

  export const postEditMember = async (req: any, res: Response, next: NextFunction) => {
    try {
      // checkInputError(req);
      const response = await memberService.postEditMember(req.body)
      // return res.status(response.statusCode).json(response);
      return res.render('member/members', {
        membersData: response.data,
        error: false,
        errorMessage: "",
        successMessage: response.message
      })
    } catch (error) {
      next(error);
    }
  };
  
  export const getAllMembers = async (req: any, res: Response, next: NextFunction) => {
    try {
      // checkInputError(req);
      const response = await memberService.getAllMembers();
      // return res.status(response.statusCode).json(response);
      return res.render('member/members', {
        membersData: response.data,
        error: false,
        errorMessage: ""
      })
    } catch (error) {
      next(error);
    }
  };
  
  
  export const getBorrowedBooks = async (req: any, res: Response, next: NextFunction) => {
    try {
      // checkInputError(req);
      const response = await memberService.getBorrowedBooks(req.memberId);
      // return res.status(response.statusCode).json(response);
      return res.render('librarian/profile')
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteMemberById = async (req: any, res: Response, next: NextFunction) => {
    try {
      // checkInputError(req);
      const response = await memberService.deleteMemberById(req.query.memberId);
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