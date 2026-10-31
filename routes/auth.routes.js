import express from "express";
import { registerUser } from "../controller/auth.controller.js";

const routes = express.Router();

routes.post("/register", registerUser);

export default routes;
