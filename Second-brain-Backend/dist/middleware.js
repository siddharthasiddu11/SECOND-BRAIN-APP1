import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
export const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header, JWT_SECRET);
    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        return res.status(403).json({
            message: "unauthorized"
        });
    }
};
//# sourceMappingURL=middleware.js.map