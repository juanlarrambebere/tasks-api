import {
  ApiError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from ".";

describe("errors", () => {
  describe("BadRequestError constructor", () => {
    it.each`
      message        | details
      ${"a message"} | ${"some details"}
      ${"a message"} | ${null}
    `("sets its properties correctly", ({ message, details }) => {
      const error = new BadRequestError(message, details);

      expect(error).toBeInstanceOf(ApiError);

      expect(error.name).toBe("bad_request");
      expect(error.message).toBe(message);
      expect(error.status).toBe(400);
      expect(error.details).toBe(details);
    });
  });

  describe("UnauthorizedError constructor", () => {
    it.each`
      message        | details
      ${"a message"} | ${"some details"}
      ${"a message"} | ${null}
    `("sets its properties correctly", ({ message, details }) => {
      const error = new UnauthorizedError(message, details);

      expect(error).toBeInstanceOf(ApiError);

      expect(error.name).toBe("unauthorized");
      expect(error.message).toBe(message);
      expect(error.status).toBe(401);
      expect(error.details).toBe(details);
    });
  });

  describe("ForbiddenError constructor", () => {
    it.each`
      message        | details
      ${"a message"} | ${"some details"}
      ${"a message"} | ${null}
    `("sets its properties correctly", ({ message, details }) => {
      const error = new ForbiddenError(message, details);

      expect(error).toBeInstanceOf(ApiError);

      expect(error.name).toBe("forbidden");
      expect(error.message).toBe(message);
      expect(error.status).toBe(403);
      expect(error.details).toBe(details);
    });
  });

  describe("NotFoundError constructor", () => {
    it.each`
      message        | details
      ${"a message"} | ${"some details"}
      ${"a message"} | ${null}
    `("sets its properties correctly", ({ message, details }) => {
      const error = new NotFoundError(message, details);

      expect(error).toBeInstanceOf(ApiError);

      expect(error.name).toBe("not_found");
      expect(error.message).toBe(message);
      expect(error.status).toBe(403);
      expect(error.details).toBe(details);
    });
  });
});

export default {};
