import yaml from "js-yaml";

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const parse = (content, dataFormat) => {
  if (!Object.hasOwn(parsers, dataFormat)) {
    throw new Error(`Unknown data format: '${dataFormat}'`);
  }
  return parsers[dataFormat](content);
};

export default parse;
