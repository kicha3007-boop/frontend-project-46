import fs from "node:fs";
import path from "node:path";
import parse from "./parsers.js";
import buildDiff from "./buildDiff.js";
import format from "./formatters/index.js";

const getFormat = (filepath) => path.extname(filepath).slice(1);

const readData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return parse(fs.readFileSync(absolutePath, "utf-8"), getFormat(filepath));
};

const genDiff = (filepath1, filepath2, formatName = "stylish") => {
  const diff = buildDiff(readData(filepath1), readData(filepath2));
  return format(diff, formatName);
};

export default genDiff;
