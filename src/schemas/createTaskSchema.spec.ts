import { createTaskSchema } from "./createTaskSchema";

describe("createTaskSchema", () => {
  describe("when the params are ok", () => {
    const validParams = { userId: "1" };

    describe.each`
      body
      ${{ title: "title", description: "description", status: "TODO" }}
      ${{ title: "title", description: "description", status: "IN_PROGRESS" }}
      ${{ title: "title", description: "description", status: "DONE" }}
      ${{ title: "title", description: "description", status: "ARCHIVED" }}
    `("when body = '$body'", ({ body }) => {
      it("parses it without errors", () => {
        expect(() =>
          createTaskSchema.parse({ body, params: validParams })
        ).not.toThrow();
      });
    });

    describe.each`
      body                                 | expectedError
      ${null}                              | ${"Expected object, received null"}
      ${{}}                                | ${"title is required"}
      ${{ title: 123 }}                    | ${"Expected string, received number"}
      ${{ title: "title" }}                | ${"status is required"}
      ${{ title: "title", status: 123 }}   | ${"Expected string, received number"}
      ${{ title: "title", status: "123" }} | ${`status must be a valid task status`}
    `(
      "when the body = '$body' it throws '$expectedError'",
      ({ body, expectedError }) => {
        it("fails to parse it", () => {
          expect(() =>
            createTaskSchema.parse({ body, params: validParams })
          ).toThrow(expectedError);
        });
      }
    );
  });

  describe("when the body is ok", () => {
    const validBody = {
      title: "title",
      description: "description",
      status: "ARCHIVED",
    };

    describe.each`
      params
      ${{ userId: "1" }}
    `("when params = '$params'", ({ params }) => {
      it("parses them without errors", () => {
        expect(() =>
          createTaskSchema.parse({ body: validBody, params })
        ).not.toThrow();
      });
    });

    describe.each`
      params             | expectedError
      ${null}            | ${"Expected object, received null"}
      ${{}}              | ${"userId is required"}
      ${{ userId: 123 }} | ${"Expected string, received number"}
    `(
      "when the params = '$params' it throws '$expectedError'",
      ({ params, expectedError }) => {
        it("fails to parse them", () => {
          expect(() =>
            createTaskSchema.parse({ body: validBody, params })
          ).toThrow(expectedError);
        });
      }
    );
  });
});

export default {};
