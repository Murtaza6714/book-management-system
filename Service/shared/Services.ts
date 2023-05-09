'use strict';
import moment from "moment"
import fs from 'fs'
import path from 'path'

export interface SuccessInterface {
    statusCode: number;
    token: string;
    data: any;
    totalCounts: number | null;
    message: string;
    status: string;
}

export default class Services {

    success({ statusCode = 200, token = undefined, data = [], totalCounts = null, message, status = 'success' }: Partial<SuccessInterface>) {
        return {
            message,
            status,
            statusCode,
            token,
            data,
            totalCounts,
        };
    }

    fail({ message = "Something went wrong", statusCode = 500 }) {
        const error: any = new Error(message);
        error.statusCode = statusCode;
        return error;
    }

    getDateTime(dateTime: moment.MomentInput) {
        return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
    }

    getNextDayDateTime(dateTime: moment.MomentInput) {
        return moment(dateTime).add(1,'days').format("YYYY-MM-DD HH:mm:ss");
    }

    getDateOnly(dateTime: moment.MomentInput) {
        return moment(dateTime).format("YYYY-MM-DD");
    }

    getNextDayDateOnly(dateTime: moment.MomentInput) {
        return moment(dateTime).add(1,'days').format("YYYY-MM-DD");
    }

    clearImage(filePath: string) {
        filePath = path.join(__dirname, "../", filePath);
        fs.unlink(filePath, err => {
            console.log(err);
        });
    }

    paginate(page: string, limit: string) {
        let pagination: any = {};
        if (limit)
            pagination.limit = parseInt(limit);
        pagination.offset = parseInt(page) ? (parseInt(page) - 1) * (limit ? parseInt(limit) : 0) : 0;
        return pagination;
    }

}
