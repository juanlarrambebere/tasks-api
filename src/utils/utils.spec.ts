import { exclude, isTaskStatusValid } from ".";

describe("utils", () => {
  describe("exclude", () => {
    it("removes the excluded keys from the object", () => {
      const object = {
        key1: "value 1",
        key2: "value 2",
        key3: "value 3",
      };

      exclude(object, "key2", "key3");

      expect(Object.keys(object)).toHaveLength(1);
      expect(object.key1).toEqual("value 1");
    });
  });

  describe("isTaskStatusValid", () => {
    it.each`
      status                 | expectedResult
      ${"TODO"}              | ${true}
      ${"IN_PROGRESS"}       | ${true}
      ${"DONE"}              | ${true}
      ${"ARCHIVED"}          | ${true}
      ${"AN_INVALID_STATUS"} | ${false}
    `(
      "when statys = $status, it should return $expectedResult",
      ({ status, expectedResult }) => {
        expect(isTaskStatusValid(status)).toEqual(expectedResult);
      }
    );
  });
});
