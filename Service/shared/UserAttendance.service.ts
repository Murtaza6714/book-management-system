import Services from "./Services"
import { errorMessage, httpStatusCode } from "../../Config"
import mongoose from "mongoose";
// import  { productModel } = require("../../Models"); 
import { logger, pool } from '../../Utils'

class UserAttendance extends Services {
  async markAttendance(params: any) {
    try {
      logger.info('Mark attendance  satrted ');
      const timeNow = this.getDateTime(new Date());
      const newId = new mongoose.Types.ObjectId();
      // const sql = "SELECT * FROM detected_data WHERE isSynced=1 ORDER BY syncedOn DESC"
      // const data = new Promise((resolve, reject) => {
      //   pool.
      // })
      
      logger.info('Mark attendance completed for %d');
      return this.success({ statusCode: 201, message: "Attendance Marked Successfully" });
    } catch (error) {
      logger.error(`Mark Attendance failed for Error ${error}`);
      throw (error)
    }
  }

  async ping() {
    try {
      const resData = {
        'data': {"status": "running"},
        'message': "Web UI API Server Success: I Am Alive",
        'error': false
      }
      return this.success({ statusCode: 200, data: [] })
    } catch (error) {
      logger.error(`ping failed`);
      throw error
    }
  }

}

export const userAttendance = new UserAttendance
