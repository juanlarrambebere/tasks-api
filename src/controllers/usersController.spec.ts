import { User } from "@prisma/client";
import { Request, Response } from "express";
import {
  createUserHandler,
  loginHandler,
} from "../controllers/usersController";
import { login } from "../services/authenticationService";
import { createUser } from "../services/usersService";

jest.mock("../services/authenticationService", () => ({
  login: jest.fn(),
}));

jest.mock("../services/usersService", () => ({
  createUser: jest.fn(),
}));

describe("usersController", () => {
  afterEach(jest.clearAllMocks);

  describe("createUserHandler", () => {
    const request = { body: {} } as unknown as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const next = jest.fn();

    it("tries to create the user, and if it works, responds '201 Created' and the user's data.", async () => {
      const createdUser = { id: 1 } as User;
      jest.mocked(createUser).mockResolvedValue(createdUser);

      await createUserHandler(request, response, next);

      expect(response.status).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(201);

      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining(createdUser)
      );
    });

    it("tries to create the user, and if it fails, forwards the error", async () => {
      const error = new Error("a random error");
      jest.mocked(createUser).mockRejectedValue(error);

      await createUserHandler(request, response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("loginHandler", () => {
    const request = { body: {} } as unknown as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const next = jest.fn();

    it("tries to login, and if it works, responds '200 OK' and the user's acessToken", async () => {
      const accessToken = "the access token";
      jest.mocked(login).mockResolvedValue(accessToken);

      await loginHandler(request, response, next);

      expect(response.status).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(200);

      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({ accessToken });
    });

    it("tries to login, and if it fails, forwards the error", async () => {
      const error = new Error("a random error");
      jest.mocked(login).mockRejectedValue(error);

      await loginHandler(request, response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
