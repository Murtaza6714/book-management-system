import { Router } from "express";
import { MemberController } from "../Controllers";

const router = Router();

router.get("/add-member", MemberController.getAddMember);
router.post("/add-member", MemberController.postAddMember);
router.get("/edit-member", MemberController.getEditMember);
router.post("/edit-member", MemberController.postEditMember);
// router.get("/ping", DetectQcamController.ping);
// router.post("/getLatestDetectedImage", DetectQcamController.loginController);

export default router;
