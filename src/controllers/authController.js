const authService = require("../services/authServices");

const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const loginService = await authService.login({ username, email }, password);

        res.json({
            info: "Success login",
            data: loginService
        });
    } catch (error) {
        res.status(500).json({ info: error.message });
    }
};

const register = async (req, res) => {
    try {
        let registerService = await authService.register(req.body);
        res.status(201).json({
            info: "User registered successfully",
            data: registerService
        });
    } catch (error) {
        res.status(400).json({ info: error.message });
    }
};


module.exports = {
    login,
    register,
}