import { Request, Response } from "express";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../errors";
import handleError from "./errorHandler";

describe("errorHandler", () => {
  describe("handleError", () => {
    const request = {} as unknown as Request;

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const next = jest.fn();

    afterEach(jest.clearAllMocks);

    describe.each([
      [new BadRequestError("bad request", "some details")],
      [new UnauthorizedError("unauthorized", "some details")],
      [new ForbiddenError("forbidden", "some details")],
      [new NotFoundError("not found", "some details")],
    ])("When the error received is an instance of ApiError", (error) => {
      beforeEach(() => handleError(error, request, response, next));

      it("Uses the error to set the response status and its payload", () => {
        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(error.status);

        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: error.name,
            message: error.message,
            details: error.details,
          })
        );

        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("When the error received is not an instance of ApiError", () => {
      const unexpectedError = new Error(
        "Something unexpected happened -> the user shouldn't receive this message"
      );

      beforeEach(() => {
        // prevents the message from actually being logged
        jest.spyOn(global.console, "error").mockImplementation(() => {});

        handleError(unexpectedError, request, response, next);
      });

      it("Logs the error and responds with an internal server error", () => {
        expect(global.console.error).toHaveBeenCalledTimes(1);
        expect(global.console.error).toHaveBeenCalledWith(unexpectedError);

        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(500);

        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(
          expect.objectContaining({
            message: "Internal server error",
          })
        );

        expect(next).not.toHaveBeenCalled();
      });
    });
  });
});

export default {};
