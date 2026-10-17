import _ from "lodash";

const stringify = (value) => {
  if (_.isPlainObject(value) || Array.isArray(value)) {
    return "[complex value]";
  }
  if (typeof value === "string") {
    return `'${value}'`;
  }
  return String(value);
};

const formatNodes = (nodes, parentPath) =>
  nodes.flatMap((node) => {
    const property = [...parentPath, node.key].join(".");
    switch (node.type) {
      case "nested":
        return formatNodes(node.children, [...parentPath, node.key]);
      case "added":
        return `Property '${property}' was added with value: ${stringify(node.value)}`;
      case "removed":
        return `Property '${property}' was removed`;
      case "changed":
        return `Property '${property}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case "unchanged":
        return [];
      default:
        throw new Error(`Unknown node type: '${node.type}'`);
    }
  });

const plain = (diff) => formatNodes(diff, []).join("\n");

export default plain;
