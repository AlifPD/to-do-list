const jwt = require("jsonwebtoken");
const { Users } = require("../../database/models");

const authJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ info: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded)

        const user = await Users.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ info: "Invalid token: user not found" });
        }

        req.user = { id: user.id };

        next();
    } catch (err) {
        console.error("JWT Error:", err);
        return res.status(403).json({ info: "Invalid or expired token" });
    }
};

module.exports = authJWT;