const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../database/models");

const register = async (userData) => {
    const { username, email, password } = userData;

    const existingEmail = await db.Users.findOne({ where: { email } });
    if (existingEmail) throw new Error("Email already exists");

    const existingUsername = await db.Users.findOne({ where: { username } });
    if (existingUsername) throw new Error("Username already exists");

    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));

    const newUser = await db.Users.create({
        username,
        email,
        password: hashedPassword,
    });

    return {
        username,
        email
    };
};

const login = async (identifier, password) => {
    const user = await db.Users.findOne({
        where: {
            [db.Sequelize.Op.or]: [{ username: identifier.username }, { email: identifier.username }]
        },
    });

    if (!user) throw new Error("Invalid credentials");

    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) throw new Error("Invalid credentials");

    const { id: userId, username, email } = user
    const token = jwt.sign(
        {
            userId,
            username,
            email
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES
        }
    );

    return {
        token
    };
};

module.exports = {
    login,
    register
}