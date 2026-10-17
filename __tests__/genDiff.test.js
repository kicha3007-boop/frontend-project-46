import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import genDiff from "../src/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, "..", "__fixtures__", filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), "utf-8").trimEnd();

describe.each(["json", "yml"])("genDiff for %s files", (extension) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);

  test("stylish is the default format", () => {
    expect(genDiff(filepath1, filepath2)).toBe(readFixture("expected_stylish.txt"));
  });

  test("plain", () => {
    expect(genDiff(filepath1, filepath2, "plain")).toBe(readFixture("expected_plain.txt"));
  });

  test("json", () => {
    const diff = JSON.parse(genDiff(filepath1, filepath2, "json"));
    expect(diff).toEqual(
      expect.arrayContaining([expect.objectContaining({ key: "group2", type: "removed" })]),
    );
    expect(diff.find(({ key }) => key === "common").children).toContainEqual({
      key: "setting3",
      type: "changed",
      value1: true,
      value2: null,
    });
  });
});

test("unknown output format", () => {
  expect(() => genDiff(getFixturePath("file1.json"), getFixturePath("file2.json"), "xml")).toThrow(
    "Unknown format: 'xml'",
  );
});

test("unknown input format", () => {
  expect(() => genDiff(getFixturePath("expected_plain.txt"), getFixturePath("file2.json"))).toThrow(
    "Unknown data format: 'txt'",
  );
});
