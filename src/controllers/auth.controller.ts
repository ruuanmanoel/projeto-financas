// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { authService } from "../services/auth.service.js";

export const authController = {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await authService.register(name, email, password);

    return res.status(201).json(user);
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.json(result);
  }
};