"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const http_errors_1 = __importDefault(require("http-errors"));
// Register User
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    try {
        const user = yield user_1.default.create({ username, password: hashedPassword });
        return res.status(201).json({ message: "User created", userId: user.id });
    }
    catch (error) {
        return http_errors_1.default.InternalServerError("Error creating user");
    }
});
exports.register = register;
// Login User
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const validPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            return http_errors_1.default.Unauthorized("Invalid username/password!");
        }
        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, { expiresIn: "1h" });
        res.json({ token });
    }
    catch (error) {
        return http_errors_1.default.Unauthorized();
    }
});
exports.login = login;
