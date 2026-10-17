import _ from "lodash";

const indentSize = 4;
const markerShift = 2;

const indent = (depth) => " ".repeat(depth * indentSize - markerShift);
const bracketIndent = (depth) => " ".repeat((depth - 1) * indentSize);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const lines = Object.entries(value).map(
    ([key, item]) => `${indent(depth + 1)}  ${key}: ${stringify(item, depth + 1)}`,
  );
  return ["{", ...lines, `${bracketIndent(depth + 1)}}`].join("\n");
};

const formatNodes = (nodes, depth) => {
  const lines = nodes.flatMap((node) => {
    const line = (marker, value) =>
      `${indent(depth)}${marker} ${node.key}: ${stringify(value, depth)}`;
    switch (node.type) {
      case "nested":
        return `${indent(depth)}  ${node.key}: ${formatNodes(node.children, depth + 1)}`;
      case "added":
        return line("+", node.value);
      case "removed":
        return line("-", node.value);
      case "unchanged":
        return line(" ", node.value);
      case "changed":
        return [line("-", node.value1), line("+", node.value2)];
      default:
        throw new Error(`Unknown node type: '${node.type}'`);
    }
  });
  return ["{", ...lines, `${bracketIndent(depth)}}`].join("\n");
};

const stylish = (diff) => formatNodes(diff, 1);

export default stylish;
