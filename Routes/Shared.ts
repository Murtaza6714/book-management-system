import { Router } from "express";
import { UserController, AuthController } from "../Controllers";

const router = Router();

router.get('/', AuthController.redirectToLogin)
router.get("/mark-attendance", UserController.markAttendance);
router.get("/member-login", AuthController.getMemberLogin);
router.get("/librarian-login", AuthController.getLibrarianLogin);
// router.get("/ping", DetectQcamController.ping);
// router.post("/getLatestDetectedImage", DetectQcamController.loginController);

export default router;
