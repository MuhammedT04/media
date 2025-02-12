import express from "express";
import { signUp, checkLong, userEdit, imageAndVideo,getMedia } from "../controllers/user";
import { verifyToken } from "../utils/verifyUser";
import upload from "../config/multer";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-In", checkLong);
// router.get("/get", verifyToken,getUser)
router.post("/userEdit",verifyToken,userEdit)
router.post("/upload", upload.single("file"), imageAndVideo);

router.get("/getMedia", getMedia);
export default router;
