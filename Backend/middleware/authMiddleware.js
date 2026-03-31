import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {   // ✅ next yahan hona chahiye
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.id;
    next(); // ✅ ab ye chalega
  } catch (error) {
    return res.status(401).json({ message: "Token failed" });
  }
};