// src/services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";
import { env } from "../config/env.js";

export const authService = {
  async register(name: string, email: string, password: string) {
    const userExists = userRepository.findByEmail(email);

    if (userExists) {
      throw new Error("User already exists");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password: hash
    });

    return user;
  },

  async login(email: string, password: string) {
    const user = userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.id },
      env.jwtSecret,
      { expiresIn: "1d" }
    );

    return { token };
  }
};