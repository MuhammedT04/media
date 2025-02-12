import { NextFunction, Request, Response } from "express";
import UserSchema from "../model/User";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

import ImagesStoreModel from "../model/PhotoAndVideo";

interface MulterRequest extends Request {
  file?: Express.Multer.File; // Extend Request to recognize `file`
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const { name, email, password } = data;

    const trimPassword = password.replace(/\s+/g, "");

    const hashPassword = await bcrypt.hash(trimPassword, 10);
    const user = await UserSchema.find({ email: email });
    if (user.length == 0) {
      const signUpData = new UserSchema({
        userName: name,
        email: email,
        password: hashPassword,
      });
      await signUpData.save();
      res.status(200).json({
        data: signUpData,
        message: "User Created Successfully",
        errors: true,
      });
    } else {
      res.json({ errors: false, message: "Email already exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkLong = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const { email, password } = data;
    const user = await UserSchema.findOne({ email: email });
    if (user) {
      console.log("fkfklsfsdlfsdjflsjdf");
      const validPassword = bcrypt.compareSync(password, user.password);
      if (validPassword) {
        console.log("fkfklsfsdlfsdjflsjdf0000000000000000000");
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_TOKEN as string
        );

        const { password, ...rest } = user.toObject();
        const expiryDate = new Date(Date.now() + 3600000);
        res
          .cookie("access_token", token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json({ rest, user, message: "Success" });
      } else {
        res.json({ message: "Password is wrong" });
      }
    } else {
      res.json({ message: "Invalid credential" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const userEdit = async (req: Request, res: Response) => {
  try {
    const { name, avatarSrc, id } = req.body;

    const newUser = await UserSchema.findOneAndUpdate(
      { _id: id },
      { $set: { userName: name, profilePicture: avatarSrc } },
      { new: true }
    );

    res.status(200).json({ newUser, message: "Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const imageAndVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const trimData = req.body.user.replace(/"/g, "");
    const userId = new mongoose.Types.ObjectId(trimData);
    const newMedia = new ImagesStoreModel({
      userId,
      image: req.file.filename,
      imageType:req.file.mimetype
    });
    await newMedia.save();

    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file });
  } catch (error) {
    next(error);
  }
};

export const getMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const media = await ImagesStoreModel.find();
    console.log(media,'pppp')
    res.status(200).json(media);
  } catch (error) {
    next(error);
  }
};
