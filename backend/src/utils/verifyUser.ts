import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      return next(new Error("You are not authenticated!"));
    }

    jwt.verify(
      token,
      process.env.JWT_TOKEN as string,
      (err: any, decoded: any) => {
        if (err) {
          return next(new Error("Token is not valid!"));
        }

        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};
