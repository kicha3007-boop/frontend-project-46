import _ from "lodash";

// Узел дифа: { key, type, ... }; type — added, removed, changed, unchanged или nested
const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!Object.hasOwn(data2, key)) {
      return { key, type: "removed", value: value1 };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: "added", value: value2 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: "nested", children: buildDiff(value1, value2) };
    }
    if (_.isEqual(value1, value2)) {
      return { key, type: "unchanged", value: value1 };
    }
    return { key, type: "changed", value1, value2 };
  });
};

export default buildDiff;
