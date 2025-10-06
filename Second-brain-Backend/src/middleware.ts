import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";
import type { Request, Response, NextFunction } from "express";


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {

   const header = req.headers["authorization"];
   const decoded = jwt.verify(header as string, JWT_SECRET);

   if(decoded){
      // @ts-ignore
     req.userId = decoded.id;
     next();
   }
   else{
     return res.status(403).json({
        message: "unauthorized"
     })
   }

}