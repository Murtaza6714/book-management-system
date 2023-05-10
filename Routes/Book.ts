import { Router } from "express";
import { BookController } from "../Controllers";

const router = Router();

router.get("/book/:bookId", BookController.getBookById);
router.get("/add-book", BookController.getAddBook);
router.post("/add-book", BookController.postAddBook);
router.get("/books", BookController.getAllBooks);
router.get("/edit-book", BookController.getEditBook);
router.post("/edit-book", BookController.postEditBook);
// router.post("/getLatestDetectedImage", DetectQcamController.loginController);

export default router;
