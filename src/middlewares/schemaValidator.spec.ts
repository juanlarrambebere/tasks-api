import { Request, Response } from "express";
import { AnyZodObject } from "zod";
import { BadRequestError } from "../errors";
import { validateSchema } from "./schemaValidator";

describe("schemaValidator", () => {
  afterEach(jest.clearAllMocks);

  describe("validateSchema", () => {
    const request = {
      body: {},
      params: {},
      query: {},
    } as Request;

    const response = {} as Response;

    const next = jest.fn();

    const schema = {
      parse: jest.fn(),
    } as unknown as AnyZodObject;

    describe("when the request matches the schema", () => {
      beforeEach(() => {
        jest.mocked(schema.parse).mockReturnValue({});
      });

      it("it calls the next middleware in the chain without errors", async () => {
        await validateSchema(schema)(request, response, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalled();
      });
    });

    describe("when the request doesn't match the schema", () => {
      const error = { errors: "a list of errors" };

      beforeEach(() => {
        jest.mocked(schema.parse).mockImplementation(() => {
          throw error;
        });
      });

      it("it calls the next middleware in the chain with a bad request error", async () => {
        await validateSchema(schema)(request, response, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(
          new BadRequestError("Invalid schema", error.errors)
        );
      });
    });
  });
});

export default {};
