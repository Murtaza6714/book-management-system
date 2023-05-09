import { validationResult, body, query, param, check } from "express-validator"
import { Request } from "express-validator/src/base";
import fs from 'fs'
import { logger } from './Logger'

type Key =  string | string[] | undefined

export const bodyNotEmpty = (key: Key) => {
    return body(key).notEmpty().withMessage(`${key} field is empty`);
};

export const queryNotEmpty = (key: Key) => {
    return query(key).notEmpty().withMessage(`${key} field is empty`);
};

export const paramNotEmpty = (key: Key) => {
    return param(key).notEmpty().withMessage(`${key} field is empty`);
};
export const ValidateDateFormat = (key: Key) =>{
    return check(key).matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).withMessage(`${key} format should be (YYYY-MM-DD)`)
}
export const ValidateStatus = (key: Key) =>{
    return check(key).trim().matches(/^[A-Z]+$/).withMessage(`${key} Should be in caps`)
}
export const ValidateName = (key: Key) =>{
    return check(key).matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).withMessage(`${key} can contain only Uppercase, lowercase and single space`)
}
export const clearImage= (path: fs.PathLike)=>{
    fs.unlink(path, (err) => {
        if (err) {
            logger.error(err)
        }})
}
export const checkInputError = function(req: Request, images: any = []) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (images.length > 0) {
            images.forEach((image: { path: any; }) => {
                clearImage(image.path);
            });
        }
        const error: any = new Error("Validation failed, entered data is incorrect");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
};

export const catchError = function (err: { statusCode: number; }, next: (arg0: any) => void) {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
}
