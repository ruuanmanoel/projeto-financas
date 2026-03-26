import { prisma } from "../database";

type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const users: User[] = [];

export const userRepository = {
  findByEmail(email: string) {
    return users.find(u => u.email === email);
  },

  async create(user: CreateUserDTO) {
    const users = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    });

    return users;
  }
};